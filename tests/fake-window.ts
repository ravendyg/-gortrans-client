export function createFakeWindow(): any {
  return {
    document: createFakeDocument()
  };
}

function createFakeDocument() {
  const
    keyUpListeners: { [event: string]: ((ev: Event) => void) []} = {}
    ;

  function addEventListener(event: string, cb: (ev: Event) => void) {
    if (!keyUpListeners[event]) {
      keyUpListeners[event] = [cb];
    } else {
      keyUpListeners[event].push(cb);
    }
  }

  function removeEventListener(event: string, cb: (ev: Event) => void) {
    if (keyUpListeners[event]) {
      keyUpListeners[event] = keyUpListeners[event].filter(_cb => _cb !== cb);
    }
  }

  function simulate(event: string, arg: any) {
    (keyUpListeners[event] || []).forEach(cb => {
      cb(arg);
    });
  }

  return {
    keyUpListeners,
    addEventListener,
    removeEventListener,
    simulate,
  };
}
