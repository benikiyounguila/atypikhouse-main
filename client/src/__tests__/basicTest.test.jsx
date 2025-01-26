describe('Test minimal', () => {
  beforeAll(() => {
    console.log('beforeAll est bien défini');
  });

  it('devrait exécuter beforeAll', () => {
    expect(true).toBe(true);
  });
});
