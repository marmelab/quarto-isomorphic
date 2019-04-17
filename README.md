<table>
        <tr>
            <td><img width="120" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/rocket.svg" alt="onboarding" /></td>
            <td><strong>Archived Repository</strong><br />
            The code of this repository was written during a <a href="https://marmelab.com/blog/2018/09/05/agile-integration.html">Marmelab agile integration</a>. It illustrates the efforts of a new hiree, who had to implement a board game in several languages and platforms as part of his initial learning. Some of these efforts end up in failure, but failure is part of our learning process, so the code remains publicly visible.<br />
        <strong>This code is not intended to be used in production, and is not maintained.</strong>
        </td>
        </tr>
</table>

# Quarto isomorphic

The game of Quarto, with react in SSR mode.

## Requirements

Make sure to have `nodejs` and `npm` installed.

## Install the game

``` bash
make install
```

## Run the game

Run Quarto isomorphic game

``` bash
make run
```

## Test the code

Run unit tests on source code

``` bash
make test
```

## Lint the code

Inspect source code and writing rules

``` bash
make lint
```

## Deploy

Deploy project on server
  -Add ssh parameter to specify distant connection name (like make deploy sshname=quartoServer)

```
make deploy
```
