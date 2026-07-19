# GitHub Pages release and custom-domain checklist

The site is published from `zytx121/zytx121.github.io` and uses the apex domain
`zhouyue.space`. The repository must keep the root `CNAME` file containing that
domain.

## DNS records

At the DNS provider, remove the legacy apex A records `192.30.252.153` and
`192.30.252.154`, then configure all four current GitHub Pages A records:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `zytx121.github.io` |

Do not leave additional apex A, AAAA, ALIAS, or ANAME records pointing at a
different service. DNS changes can take up to 24 hours to propagate.

## GitHub Pages settings

1. Open **Repository settings → Pages**.
2. Confirm the publishing source is the `master` branch and the custom domain is
   `zhouyue.space`.
3. Wait until GitHub reports the DNS check as successful and provisions the
   certificate.
4. Enable **Enforce HTTPS**.

## Verification

Run these checks after DNS propagation:

```powershell
Resolve-DnsName zhouyue.space -Type A
curl.exe -I http://zhouyue.space/
curl.exe -I https://zhouyue.space/
curl.exe -I https://www.zhouyue.space/
```

Acceptance criteria:

- the A lookup returns the four `185.199.108–111.153` addresses;
- HTTP redirects to HTTPS;
- the TLS certificate is valid for `zhouyue.space`;
- `www` redirects to the canonical apex domain;
- the final HTML canonical URL starts with `https://zhouyue.space/`.

Reference: [GitHub Pages custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

