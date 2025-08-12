'use strict';

module.exports = {
    types: [
        { value: 'feature', name: 'feature:  Add new feature' },
        { value: 'ui', name: 'ui: Update UI' },
        { value: 'fix', name: 'fix: Fix bug' },
        { value: 'bug', name: 'bug: Bug number from testing feedback' },
        {
            value: 'style',
            name: 'style: Code formatting (changes that do not affect code execution)'
        },
        { value: 'merge', name: 'merge: Merge branches' },
        { value: 'perf', name: 'perf: Performance optimization' },
        { value: 'refactor', name: 'refactor: Refactor (neither adding features nor fixing bugs)' },
        {
            value: 'chore',
            name: 'chore: Build process or auxiliary tool changes (config file changes)'
        },
        { value: 'docs', name: 'docs: Documentation changes' }
    ],
    // override the messages, defaults are as follows
    messages: {
        type: 'Select the type of change that you are committing:',
        customScope: 'Denote the SCOPE of this change (optional):',
        subject: 'Write a SHORT, IMPERATIVE tense description of the change:',
        body: 'Provide a LONGER description of the change (optional):',
        footer: 'Any ISSUES to be closed by this change (optional):',
        confirmCommit: 'Are you sure you want to proceed with the commit above? (y/n/e/h)'
    },
    allowCustomScopes: false,
    skipQuestions: ['footer'],
    subjectLimit: 72
};
