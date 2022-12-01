global.FinalizationRegistry =
  global.FinalizationRegistry ||
  class FakeFinalizationRegistry {
    register() {}

    unregister() {}
  };
