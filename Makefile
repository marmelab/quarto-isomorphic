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
