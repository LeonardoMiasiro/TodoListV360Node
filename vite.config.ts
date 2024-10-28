export default ({
    test: {
        include: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
        globals: true,
        root: './',
        setupFiles: ['./test/setup-e2e.ts'],
    },
});
