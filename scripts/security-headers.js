import { readFileSync } from 'node:fs'

const nginxConfig = readFileSync('nginx.conf', 'utf8')

const requiredChecks = [
	['server_tokens off', /server_tokens\s+off\s*;/],
	['X-Frame-Options header', /add_header\s+X-Frame-Options\s+"SAMEORIGIN"\s+always;/],
	['X-Content-Type-Options header', /add_header\s+X-Content-Type-Options\s+"nosniff"\s+always;/],
	['Referrer-Policy header', /add_header\s+Referrer-Policy\s+"strict-origin-when-cross-origin"\s+always;/],
	['Permissions-Policy header', /add_header\s+Permissions-Policy\s+"camera=\(\), microphone=\(\), geolocation=\(\)"\s+always;/],
	['CSP default-src self', /Content-Security-Policy[^\n]+default-src 'self'/],
	['CSP object-src none', /Content-Security-Policy[^\n]+object-src 'none'/],
	['CSP base-uri self', /Content-Security-Policy[^\n]+base-uri 'self'/],
	['CSP frame-ancestors self', /Content-Security-Policy[^\n]+frame-ancestors 'self'/],
]

const failures = requiredChecks
	.filter(([, pattern]) => !pattern.test(nginxConfig))
	.map(([label]) => label)

if (/script-src[^;]*'unsafe-inline'/.test(nginxConfig)) {
	failures.push('CSP script-src must not allow unsafe-inline')
}

if (/connect-src[^;]*(\shttp:|\sws:)/.test(nginxConfig)) {
	failures.push('CSP connect-src must not allow plaintext http: or ws:')
}

const locationBlocksWithHeaders = [...nginxConfig.matchAll(/location\s+[^{}]+\{[^{}]*add_header[^{}]*\}/g)]
if (locationBlocksWithHeaders.length > 0) {
	const missingLocationHeaders = locationBlocksWithHeaders
		.filter(([block]) => !/X-Content-Type-Options/.test(block) || !/Content-Security-Policy/.test(block))
		.map(([block]) => block.match(/location\s+[^{}]+/)?.[0] ?? 'location block')

	if (missingLocationHeaders.length > 0) {
		failures.push(
			`location blocks with add_header must repeat security headers: ${missingLocationHeaders.join(', ')}`
		)
	}
}

if (failures.length > 0) {
	console.error('Security header check failed:')
	for (const failure of failures) {
		console.error(`- ${failure}`)
	}
	process.exit(1)
}

console.log('Security header check passed.')
