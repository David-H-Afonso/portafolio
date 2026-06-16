import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const ignoredDirectories = new Set([
	'.git',
	'node_modules',
	'dist',
	'build',
	'coverage',
	'.vite',
	'.turbo',
	'.cache',
])
const ignoredFiles = new Set(['package-lock.json', 'SECURITY_REVIEW.md'])
const includedExtensions = new Set([
	'.js',
	'.ts',
	'.tsx',
	'.jsx',
	'.json',
	'.yml',
	'.yaml',
	'.html',
	'.md',
	'.conf',
])

const secretPatterns = [
	['private key', /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/i],
	['GitHub token', /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/],
	['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
	['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
	['OpenAI-style API key', /\bsk-[A-Za-z0-9_-]{20,}\b/],
	[
		'hardcoded secret assignment',
		/\b(?:api[_-]?key|secret|password|passwd|pwd|token|client[_-]?secret)\b\s*[:=]\s*['"][^'"${}]{12,}['"]/i,
	],
]

const getExtension = (filePath) => {
	const match = filePath.match(/\.[^.]+$/)
	return match?.[0] ?? ''
}

const shouldScanFile = (filePath) => {
	const fileName = filePath.split(/[\\/]/).pop()
	return !ignoredFiles.has(fileName) && includedExtensions.has(getExtension(filePath))
}

const walk = (directory) => {
	const results = []

	for (const entry of readdirSync(directory)) {
		if (ignoredDirectories.has(entry)) {
			continue
		}

		const fullPath = join(directory, entry)
		const stats = statSync(fullPath)

		if (stats.isDirectory()) {
			results.push(...walk(fullPath))
			continue
		}

		if (stats.isFile() && shouldScanFile(fullPath)) {
			results.push(fullPath)
		}
	}

	return results
}

const findings = []

for (const filePath of walk(root)) {
	const content = readFileSync(filePath, 'utf8')
	const lines = content.split(/\r?\n/)

	lines.forEach((line, index) => {
		for (const [label, pattern] of secretPatterns) {
			if (pattern.test(line)) {
				findings.push({
					file: relative(root, filePath),
					line: index + 1,
					label,
				})
			}
		}
	})
}

if (findings.length > 0) {
	console.error('Potential secret scan findings. Values are intentionally not printed:')
	for (const finding of findings) {
		console.error(`- ${finding.file}:${finding.line} (${finding.label})`)
	}
	process.exit(1)
}

console.log('Secret pattern check passed.')
