/* eslint-disable max-classes-per-file */

// export interface EventCenterInstance {
//   on: (event: string, handler: (...args: any[]) => any) => void
//   off: (event: string, handler: (...args: any[]) => any) => void
//   clean: () => void
// }

export class EventCenter {
  private id: string
  private element: Element
  private events: Record<string, any> = {}
  private handlers: Record<string, any> = {}

  constructor(element?: Element, id?: string) {
    this.element = element ?? document.body
    this.id = id || ''
  }

  public on(event: string, handler: (...args: any[]) => any) {
    if (!this.events[event]) {
      this.events[event] = []
      const eventHandler = (e: Event) => {
        if (!this.events[event]) return
        for (const item of this.events[event]) {
          item(e)
        }
      }
      this.handlers[event] = eventHandler
      this.element.addEventListener(event, eventHandler)
    }
    this.events[event].push(handler)
    // console.log(`${this.id} on:`, this.events)
  }

  public off(event: string, handler: (...args: any[]) => any) {
    if (!this.events[event]?.length) {
      return
    }
    this.events[event].splice(this.events[event].indexOf(handler), 1)
    if (!this.events[event].length) {
      delete this.events[event]
      this.element.removeEventListener(event, this.handlers[event])
    }
    // console.log(`${this.id} off:`, this.events)
  }

  public clean() {
    for (const item in this.events) {
      this.element.removeEventListener(item, this.handlers[item])
    }
    this.events = {}
    // console.log(`${this.id} clean:`, this.events)
  }
}

class GlobalEventCenterBuilder {
  ElementEvents: Record<any, EventCenter> = {}

  public get(selector: string) {
    const element = document.querySelector(selector)
    if (!element) return null
    if (!this.ElementEvents[selector]) {
      this.ElementEvents[selector] = new EventCenter(element, 'body')
    }
    return this.ElementEvents[selector]
  }
}

/**
import GlobalEventCenter from 'xxx'

const BodyEvents = GlobalEventCenter.get('body')

const handler = () => {
  // dosomthing ...
}
BodyEvents.on('mousedown', handler)
BodyEvents.off('mousedown', handler)
*/
export const GlobalEventCenter = new GlobalEventCenterBuilder()
