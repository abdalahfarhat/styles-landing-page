describe('Editorial Workflow', () => {
  const workflowStatus = { draft: 'Drafts', review: 'In Review', ready: 'Ready' }
  const editorStatus = { draft: 'Draft', review: 'In review', ready: 'Ready' }
  const entry1 = { title: 'first title', body: 'first body' }
  const entry2 = { title: 'second title', body: 'second body' }
  const entry3 = { title: 'third title', body: 'third body' }
  const notifications = {
    saved: 'Entry saved',
    published: 'Entry published',
    updated: 'Entry status updated',
    deletedUnpublished: 'Unpublished changes deleted',
  }

  describe('Test Backend', () => {
    function login() {
      cy.viewport(1200, 1200)
      cy.visit('/')
      cy.contains('button', 'Login').click()
    }

    function createPost({ title, body }) {
      cy.contains('a', 'New Post').click()
      cy.get('input').first().type(title)
      cy.get('[data-slate-editor]').click().type(body)
      cy.get('input').first().click()
      cy.contains('button', 'Save').click()
      assertNotification(notifications.saved)
    }

    function exitEditor() {
      cy.contains('a[href^="#/collections/"]', 'Writing in').click()
    }

    function deleteEntryInEditor() {
      cy.contains('button', 'Delete').click()
      assertNotification(notifications.deletedUnpublished)
    }

    function assertEntryDeleted(entry) {
      if (Array.isArray(entry)) {
        const titles = entry.map(e => e.title)
        cy.get('a h2').each((el, idx) => {
          expect(titles).not.to.include(el.text())
        })
      } else {
        cy.get('a h2').each((el, idx) => {
          expect(entry.title).not.to.equal(el.text())
        })
      }
    }

    function createAndDeletePost(entry) {
      createPost(entry)
      deleteEntryInEditor()
    }

    function createPostAndExit(entry) {
      createPost(entry)
      exitEditor()
    }

    function createPublishedPost(entry) {
      createPost(entry)
      updateWorkflowStatusInEditor(editorStatus.ready)
      publishInEditor()
    }

    function createPublishedPostAndExit(entry) {
      createPublishedPost(entry)
      exitEditor()
    }

    function goToWorkflow() {
      cy.contains('a', 'Workflow').click()
    }

    function goToCollections() {
      cy.contains('a', 'Content').click()
    }

    function updateWorkflowStatus({ title }, fromColumnHeading, toColumnHeading) {
      cy.contains('h2', fromColumnHeading)
        .parent()
        .contains('a', title)
        .trigger('dragstart', {
          dataTransfer: {},
          force: true,
        })
      cy.contains('h2', toColumnHeading)
        .parent()
        .trigger('drop', {
          dataTransfer: {},
          force: true,
        })
      assertNotification(notifications.updated)
    }

    function assertWorkflowStatus({ title }, status) {
      cy.contains('h2', status)
        .parent()
        .contains('a', title)
    }

    function updateWorkflowStatusInEditor(newStatus) {
      cy.contains('[role="button"]', 'Set status').as('setStatusButton')
      cy.get('@setStatusButton').parent().within(() => {
        cy.get('@setStatusButton').click()
        cy.contains('[role="menuitem"] span', newStatus).click()
      })
      assertNotification(notifications.updated)
    }

    function assertWorkflowStatusInEditor(status) {
      cy.contains('[role="button"]', 'Set status').as('setStatusButton')
      cy.get('@setStatusButton').parent().within(() => {
        cy.get('@setStatusButton').click()
        cy.contains('[role="menuitem"] span', status).parent().within(() => {
          cy.get('svg')
        })
        cy.get('@setStatusButton').click()
      })
    }

    function publishWorkflowEntry({ title }) {
      cy.contains('h2', workflowStatus.ready).parent().within(() => {
        cy.contains('a', title).parent().within(() => {
          cy.contains('button', 'Publish new entry').click({ force: true })
        })
      })
      assertNotification(notifications.published)
    }

    function assertPublishedEntry(entry) {
      if (Array.isArray(entry)) {
        const entries = entry.reverse()
        cy.get('a h2').then(els => {
          cy.wrap(els.slice(0, entries.length)).each((el, idx) => {
            cy.wrap(el).contains(entries[idx].title)
          })
        })
      } else {
        cy.get('a h2').first().contains(entry.title)
      }
    }

    function assertNotification(message) {
      if (Array.isArray(message)) {
        const messages = message.reverse()
        cy.get('.notif__container div')
          .should('have.length.of', messages.length, )
          .each((el, idx) => {
            cy.wrap(el).contains(messages[idx]).invoke('hide')
          })
      } else {
        cy.get('.notif__container').within(() => {
          cy.contains(message).invoke('hide')
        })
      }
    }

    function assertOnCollectionsPage() {
      cy.url().should('contain', '/#/collections/posts')
      cy.contains('h2', 'Collections')
    }

    it('successfully loads', () => {
      login()
    })

    it('can create an entry', () => {
      login()
      createPostAndExit(entry1)
    })

    it('can publish an editorial workflow entry', () => {
      login()
      createPostAndExit(entry1)
      goToWorkflow()
      updateWorkflowStatus(entry1, workflowStatus.draft, workflowStatus.ready)
      publishWorkflowEntry(entry1)
    })

    it('can change workflow status', () => {
      login()
      createPostAndExit(entry1)
      goToWorkflow()
      updateWorkflowStatus(entry1, workflowStatus.draft, workflowStatus.review)
      updateWorkflowStatus(entry1, workflowStatus.review, workflowStatus.ready)
      updateWorkflowStatus(entry1, workflowStatus.ready, workflowStatus.review)
      updateWorkflowStatus(entry1, workflowStatus.review, workflowStatus.draft)
      updateWorkflowStatus(entry1, workflowStatus.draft, workflowStatus.ready)
    })

    it('can change status on and publish multiple entries', () => {
      login()
      createPostAndExit(entry1)
      createPostAndExit(entry2)
      createPostAndExit(entry3)
      goToWorkflow()
      updateWorkflowStatus(entry3, workflowStatus.draft, workflowStatus.ready)
      updateWorkflowStatus(entry2, workflowStatus.draft, workflowStatus.ready)
      updateWorkflowStatus(entry1, workflowStatus.draft, workflowStatus.ready)
      publishWorkflowEntry(entry3)
      publishWorkflowEntry(entry2)
      publishWorkflowEntry(entry1)
      goToCollections()
      assertPublishedEntry([entry3, entry2, entry1])
    })

    it('can delete an entry', () => {
      login()
      createPost(entry1)
      deleteEntryInEditor()
      assertOnCollectionsPage()
      assertEntryDeleted(entry1)
    })

    it('can update workflow status from within the editor', () => {
      login()
      createPost(entry1)
      assertWorkflowStatusInEditor(editorStatus.draft)
      updateWorkflowStatusInEditor(editorStatus.review)
      assertWorkflowStatusInEditor(editorStatus.review)
      updateWorkflowStatusInEditor(editorStatus.ready)
      assertWorkflowStatusInEditor(editorStatus.ready)
      exitEditor()
      goToWorkflow()
      assertWorkflowStatus(entry1, workflowStatus.ready)
    })
  })
})
