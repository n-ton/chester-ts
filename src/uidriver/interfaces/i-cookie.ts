export interface ICookie {
  /**
   * The name of the cookie.
   */
  name: string

  /**
   * The cookie value.
   */
  value: string

  /**
   * The cookie path. Defaults to "/" when adding a cookie.
   */
  path?: string

  /**
   * The domain the cookie is visible to. Defaults to the current browsing
   * context's document's URL when adding a cookie.
   */
  domain?: string

  /**
   * Whether the cookie is a secure cookie. Defaults to false when adding a new
   * cookie.
   */
  secure?: boolean

  /**
   * Whether the cookie is an HTTP only cookie. Defaults to false when adding a
   * new cookie.
   */
  httpOnly?: boolean

  /**
   * When the cookie expires.
   *
   * The expiry is always returned in seconds since epoch when
   * retrieving cookies from the browser.
   *
   * @type {(!number|undefined)}
   */
  expiry?: number
}
