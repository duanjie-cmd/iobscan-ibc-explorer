module.exports = {
    extends: ['@commitlint/config-conventional', 'cz'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feature', // New feature
                'bug', // Bug fixes specifically for bug numbers from testing feedback
                'fix', // Bug fixes
                'ui', // UI updates
                'docs', // Documentation changes
                'style', // Code formatting (changes that do not affect code execution)
                'perf', // Performance optimization
                'refactor', // Code refactoring (neither adding features nor fixing bugs)
                'chore', // Build process or auxiliary tool changes
                'merge' // Merge branches, e.g.: merge(frontend): feature-xxxx thread address modification
            ]
        ],
        // <type> format: lowercase
        'type-case': [2, 'always', 'lower-case'],
        // <type> can be empty
        'type-empty': [0, 'never'],
        // <scope> can be empty
        'scope-empty': [0, 'never'],
        // <scope> format
        'scope-case': [0],
        // <subject> main message can be empty
        'subject-empty': [0, 'never'],
        // <subject> ending punctuation, disabled
        'subject-full-stop': [0, 'never'],
        // <subject> format, disabled
        'subject-case': [0, 'never'],
        // <body> starts with blank line
        'body-leading-blank': [1, 'always'],
        'header-max-length': [0, 'always', 72]
    }
};
