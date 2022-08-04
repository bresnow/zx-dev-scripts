execute the commands in order

```
nginx config 
	server {
		listen 80;
		server_name app.bizbook.xyz;
		
		location / {
			proxy_pass http://localhost:3000;
		}
	}
```
## TRAEFIK V2.8 
- traefik hub upgrade

## Neat Epifz
### MD scratchnotes reader/ tester
- [] fs.readfileSync( [
	1. parse for language "```"
	2. write new
	3. exec
	4. delete
	 ])