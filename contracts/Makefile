# Soroban Account Contract Makefile

CARGO ?= cargo
SOROBAN ?= soroban
CONTRACT_PATH := account
WASM_PATH := $(CONTRACT_PATH)/target/wasm32-unknown-unknown/release/ancore_account.wasm
OPTIMIZED_WASM := $(CONTRACT_PATH)/target/wasm32-unknown-unknown/release/ancore_account.optimized.wasm

.PHONY: build test optimize deploy-testnet fmt clippy

build:
	$(CARGO) build --manifest-path $(CONTRACT_PATH)/Cargo.toml --target wasm32-unknown-unknown --release

optimize: build
	$(SOROBAN) contract optimize --wasm $(WASM_PATH) --output $(OPTIMIZED_WASM)

test:
	$(CARGO) test --manifest-path $(CONTRACT_PATH)/Cargo.toml

fmt:
	$(CARGO) fmt --manifest-path $(CONTRACT_PATH)/Cargo.toml

clippy:
	$(CARGO) clippy --manifest-path $(CONTRACT_PATH)/Cargo.toml --all-targets --all-features

deploy-testnet: optimize
	bash scripts/deploy.sh $(OPTIMIZED_WASM)
