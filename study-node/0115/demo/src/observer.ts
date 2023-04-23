class Subject {
  deps: Array<Observer>;
  state: Number;

  constructor() {
    this.deps = [];
    this.state = 0;
  }

  attach(obs: Observer) {
    this.deps.push(obs);
  }

  setState(num: Number) {
    this.state = num;
    this.notifyAllObserver();
  }

  notifyAllObserver(): void {
    this.deps.forEach((obs) => {
      obs.run(this.state);
    });
  }
}

abstract class Observer {
  subject: Subject;
  constructor(subject: Subject) {
    this.subject = subject;
    this.subject.attach(this);
  }

  abstract run(data: String | Number): void;
}

class BinaryObserver extends Observer {
  constructor(subject: Subject) {
    super(subject);
  }

  run(data: String | Number): void {
    console.log("hello this is the binary observer");
  }
}

class ArrayObserver extends Observer {
  constructor(subject: Subject) {
    super(subject);
  }

  run(data: String | Number): void {
    console.log("hello this is the arry observer");
  }
}

const subject = new Subject();
const obs = new BinaryObserver(subject);
const obs2 = new ArrayObserver(subject);

subject.setState(10);
