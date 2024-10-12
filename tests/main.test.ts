// ? Router Mock
vi.mock('@/router', () => ({
  default: 'router',
}));

// ? Pinia Mock
vi.mock('pinia', async (importOriginal) => {
  const mod: any = await importOriginal();

  return {
    ...mod,
    createPinia: vi.fn().mockReturnValue('pinia'),
  };
});

describe('Tests in main.ts', () => {
  const vue = require('vue');
  const useSpy = vi.fn();
  const mountSpy = vi.fn();
  const createApp = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy,
  });

  vue.createApp = createApp;

  test('App should be configured with pinia and router', async () => {
    await import('@/main');

    expect(vue.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');
    expect(useSpy).toHaveBeenCalledWith('router');
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
