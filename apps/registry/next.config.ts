import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  // packages/ui는 .tsx 소스만 배포 — Next가 트랜스파일하도록 명시
  transpilePackages: ['@transight-design/ui'],
  // r/*.json은 public/r에서 정적 호스팅. 캐시 헤더만 조정.
  async headers() {
    return [
      {
        source: '/r/:item*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, s-maxage=3600' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      }
    ]
  }
}

export default config
