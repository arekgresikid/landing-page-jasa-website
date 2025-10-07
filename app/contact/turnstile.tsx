export default function Turnstile() {
  const siteKey = process.env.TURNSTILE_SITE_KEY || ""
  return <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />
}
