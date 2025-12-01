import { ToastProps, ToastQueueProps, ToastStruct } from "./types";

class ToastNode {
  props: ToastProps;
  next?: ToastNode;

  constructor(props: ToastProps) {
    this.props = props;
  }
}

export class ToastQueue implements ToastStruct {
  private head?: ToastNode;
  private tail?: ToastNode;
  private nodeMap = new Map<number, ToastNode>();
  private capacity: number;

  constructor(props?: ToastQueueProps) {
    this.capacity = props?.max || 5;
  }

  get peak() {
    return this.head?.props;
  }

  push(props: ToastProps) {
    if (!this.tail) {
      this.tail = new ToastNode(props);
      this.head = this.tail;
      this.nodeMap.set(props.id, this.head);
      return this;
    }

    if (this.nodeMap.size + 1 > this.capacity) {
      this.pop();
    }

    this.tail.next = new ToastNode(props);
    this.tail = this.tail.next;
    this.nodeMap.set(props.id, this.tail);

    return this;
  }

  pop() {
    if (!this.head) return this;

    const current = this.head;
    this.head = current.next;
    if (!this.head) delete this.tail;
    this.nodeMap.delete(current.props.id);

    return this;
  }

  update(id: number, props: Omit<ToastProps, "id">): this {
    const node = this.nodeMap.get(id);
    if (node) Object.assign(node.props, props);

    return this;
  }

  remove(id: number) {
    if (!this.head) return this;

    this.nodeMap.delete(id);

    if (this.head.props.id == id) {
      this.head = this.head.next;
      if (!this.head) delete this.tail;
      return this;
    }

    let current: ToastNode | undefined = this.head;
    let currentNext = this.head.next;
    while (current) {
      if (currentNext?.props.id == id) {
        if (currentNext.props.id == this.tail?.props.id) {
          this.tail = current;
        }

        current.next = currentNext.next;
        current = current.next;
        currentNext = current?.next;
        break;
      }

      current = currentNext;
      currentNext = currentNext?.next;
    }

    return this;
  }

  toArray() {
    const res = new Array<ToastProps>();
    let current = this.head;

    while (current) {
      res.push(current.props);
      current = current.next;
    }

    return res;
  }
}
