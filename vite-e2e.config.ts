export default ({
    test: {
        include: ['**/*.e2e-spec.ts'],
        globals: true,
        root: './',
        setupFiles: ['./test/setup-e2e.ts'],
    },
});
