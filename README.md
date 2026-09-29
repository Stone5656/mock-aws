# mock-aws

ReactとViteで作成した、プレゼン・デモ用のフロントエンドプロトタイプです。

## Development

```bash
npm install
npm run dev
```

## Deploy

Cloudflare PagesのGit integrationを使用します。

### Build settings

- Framework preset: `Vite`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

GitHubリポジトリをCloudflare Pagesへ接続すると、`main`へのpush時に自動デプロイされます。

独立したCloudflare Workerは使用しません。アクセス制限にはPages Functionsのmiddlewareを使用します。

### Basic authentication

Cloudflare Dashboardで対象のPagesプロジェクトを開き、`Settings` → `Variables and Secrets`から以下を登録してください。

- `BASIC_AUTH_USERNAME`
- `BASIC_AUTH_PASSWORD`

値はGit、README、クライアントコードへ保存しないでください。Production環境への設定が必須です。Preview Deploymentも保護する場合は、Preview環境にも同じ変数名で値を設定します。変数の追加・変更後は再デプロイしてください。

Cloudflare PagesはHTTPSで配信されます。Basic認証はプロトタイプの簡易アクセス制限として使用してください。

### Local authentication check

ビルド後、ローカル用の認証情報をファイルへ保存せず、Wranglerのbindingとして渡します。

```bash
npm run build
npx wrangler pages dev dist \
  --binding BASIC_AUTH_USERNAME=testuser \
  --binding BASIC_AUTH_PASSWORD=testpass
```

別のターミナルから、未認証、誤った認証情報、正しい認証情報を確認できます。

```bash
curl -i http://localhost:8788/
curl -i -u wrong:wrong http://localhost:8788/
curl -i -u testuser:testpass http://localhost:8788/
```
