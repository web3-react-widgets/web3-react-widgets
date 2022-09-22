- export https_proxy=http://127.0.0.1:41091 http_proxy=http://127.0.0.1:41091 all_proxy=socks5://127.0.0.1:41091

## 

- 支持所有EVM兼容连，包括：以太坊侧脸，layer2
  - 拓展：
    - 支持其它 layer1 公链
    - 
- 提供基础 UI Dialog
  - 钱包选择，钱包链接信息
  - 切换网络

## Compnent

- ConnectWallet
- SwitchChain

## Hooks

- useWeb3Provider

```typescript
const {[...Web3ContextType], connectProvider, switchChain} = useWeb3Provider()
```