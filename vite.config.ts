export default ({
    test: {
        include: ['**/*.spec.ts'],
        globals: true,
        root: './',
        setupFiles: ['./test/setup-e2e.ts'],
    },
});
