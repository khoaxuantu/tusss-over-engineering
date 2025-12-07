export class TimerHelper {
  static async delay(duration: number) {
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), duration);
    });
  }
}
