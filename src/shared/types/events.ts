export interface EventMap {}
export type EventName = keyof EventMap
type EventHandler<T extends EventName> = (payload: EventMap[T]) => void | Promise<void>
class EventBus {
  private handlers = new Map<string, Set<EventHandler<any>>>()
  on<T extends EventName>(event: T, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set())
    this.handlers.get(event)!.add(handler)
    return () => { this.handlers.get(event)?.delete(handler) }
  }
  async emit<T extends EventName>(event: T, payload: EventMap[T]): Promise<void> {
    const handlers = this.handlers.get(event)
    if (!handlers) return
    await Promise.allSettled(Array.from(handlers).map(async (h) => { try { await h(payload) } catch (e) { console.error(e) } }))
  }
}
export const events = new EventBus()
