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
	scp -v quarto.zip $(sshname):~/quarto-isomorphic/
	ssh $(sshname) ' \
		mkdir -p quarto-isomorphic; \
		sudo service quartoisomorphic stop; \
		unzip -uo ~/quarto-isomorphic/quarto.zip -d ~/quarto-isomorphic/; \
		rm -f ~/quarto-isomorphic/quarto.zip; \
		cd quarto-isomorphic/; \
		npm install; \
		npm run build; \
		sudo service quartoisomorphic start; \
	'
	rm -f quarto.zip
	
