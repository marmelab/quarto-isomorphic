MAKEFLAGS += --silent

.PHONY: help run test lint

help: 
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Run Quarto isomorphic
	npm install
	npm run-script build

run: ## Run Quarto isomorphic
	npm start

test: ## Run the unit tests
	npm test

lint: ## Inpect code syntax and writing rules
	eslint .

deploy: ## Deploy website on Web Server (Need an sshname parameter for distant connection)
	zip -r quarto.zip zipfile server.js config pages src static package.json build devServer.js
	ssh $(sshname) mkdir -p quarto-isomorphic
	ssh $(sshname) sudo service quartoisomorphic stop
	scp -v quarto.zip $(sshname):~/quarto-isomorphic/
	ssh $(sshname) 'unzip -uo ~/quarto-isomorphic/quarto.zip -d ~/quarto-isomorphic/'
	ssh $(sshname) 'rm -f ~/quarto-isomorphic/quarto.zip'
	rm -f quarto.zip
	ssh $(sshname) 'cd quarto-isomorphic/ && npm install'
	ssh $(sshname) 'cd quarto-isomorphic/ && npm run build'
	ssh $(sshname) sudo service quartoisomorphic start
	
