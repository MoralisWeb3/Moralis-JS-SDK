/* eslint-disable no-template-curly-in-string */
import { EvmChainListDataEntry } from './types';

// source: https://chainid.network/chains.json
export const chainList: EvmChainListDataEntry[] = [
  {
    "name": "Ethereum Mainnet",
    "chain": "ETH",
    "icon": "ethereum",
    "rpc": [
      "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
      "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
      "https://api.mycryptoapi.com/eth",
      "https://cloudflare-eth.com",
      "https://ethereum-rpc.publicnode.com",
      "wss://ethereum-rpc.publicnode.com",
      "https://mainnet.gateway.tenderly.co",
      "wss://mainnet.gateway.tenderly.co",
      "https://rpc.blocknative.com/boost",
      "https://rpc.flashbots.net",
      "https://rpc.flashbots.net/fast",
      "https://rpc.mevblocker.io",
      "https://rpc.mevblocker.io/fast",
      "https://rpc.mevblocker.io/noreverts",
      "https://rpc.mevblocker.io/fullprivacy",
      "https://eth.drpc.org",
      "wss://eth.drpc.org"
    ],
    "features": [
      {
        "name": "EIP155"
      },
      {
        "name": "EIP1559"
      }
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://ethereum.org",
    "shortName": "eth",
    "chainId": 1,
    "networkId": 1,
    "slip44": 60,
    "ens": {
      "registry": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    "explorers": [
      {
        "name": "etherscan",
        "url": "https://etherscan.io",
        "standard": "EIP3091"
      },
      {
        "name": "blockscout",
        "url": "https://eth.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://ethereum.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Goerli",
    "title": "Ethereum Testnet Goerli",
    "chain": "ETH",
    "rpc": [
      "https://goerli.infura.io/v3/${INFURA_API_KEY}",
      "wss://goerli.infura.io/v3/${INFURA_API_KEY}",
      "https://rpc.goerli.mudit.blog/",
      "https://ethereum-goerli-rpc.publicnode.com",
      "wss://ethereum-goerli-rpc.publicnode.com",
      "https://goerli.gateway.tenderly.co",
      "wss://goerli.gateway.tenderly.co"
    ],
    "faucets": [
      "http://fauceth.komputing.org?chain=5&address=${ADDRESS}",
      "https://goerli-faucet.slock.it?address=${ADDRESS}",
      "https://faucet.goerli.mudit.blog"
    ],
    "nativeCurrency": {
      "name": "Goerli Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://goerli.net/#about",
    "shortName": "gor",
    "chainId": 5,
    "networkId": 5,
    "slip44": 1,
    "ens": {
      "registry": "0x112234455c3a32fd11230c42e7bccd4a84e02010"
    },
    "explorers": [
      {
        "name": "etherscan-goerli",
        "url": "https://goerli.etherscan.io",
        "standard": "EIP3091"
      },
      {
        "name": "blockscout-goerli",
        "url": "https://eth-goerli.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "OP Mainnet",
    "chain": "ETH",
    "rpc": [
      "https://mainnet.optimism.io",
      "https://optimism-rpc.publicnode.com",
      "wss://optimism-rpc.publicnode.com",
      "https://optimism.gateway.tenderly.co",
      "wss://optimism.gateway.tenderly.co",
      "https://optimism.drpc.org",
      "wss://optimism.drpc.org"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://optimism.io",
    "shortName": "oeth",
    "chainId": 10,
    "networkId": 10,
    "explorers": [
      {
        "name": "etherscan",
        "url": "https://optimistic.etherscan.io",
        "standard": "EIP3091"
      },
      {
        "name": "blockscout",
        "url": "https://optimism.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://optimism.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Cronos Mainnet",
    "chain": "CRO",
    "rpc": [
      "https://evm.cronos.org",
      "https://cronos-evm-rpc.publicnode.com",
      "wss://cronos-evm-rpc.publicnode.com",
      "https://cronos.drpc.org",
      "wss://cronos.drpc.org"
    ],
    "features": [
      {
        "name": "EIP1559"
      }
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Cronos",
      "symbol": "CRO",
      "decimals": 18
    },
    "infoURL": "https://cronos.org/",
    "shortName": "cro",
    "chainId": 25,
    "networkId": 25,
    "explorers": [
      {
        "name": "Cronos Explorer",
        "url": "https://explorer.cronos.org",
        "standard": "none"
      }
    ]
  },
  {
    "name": "BNB Smart Chain Mainnet",
    "chain": "BSC",
    "rpc": [
      "https://bsc-dataseed1.bnbchain.org",
      "https://bsc-dataseed2.bnbchain.org",
      "https://bsc-dataseed3.bnbchain.org",
      "https://bsc-dataseed4.bnbchain.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "https://bsc-rpc.publicnode.com",
      "wss://bsc-rpc.publicnode.com",
      "wss://bsc-ws-node.nariox.org"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "BNB Chain Native Token",
      "symbol": "BNB",
      "decimals": 18
    },
    "infoURL": "https://www.bnbchain.org/en",
    "shortName": "bnb",
    "chainId": 56,
    "networkId": 56,
    "slip44": 714,
    "explorers": [
      {
        "name": "bscscan",
        "url": "https://bscscan.com",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://bnb.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "BNB Smart Chain Testnet",
    "chain": "BSC",
    "rpc": [
      "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
      "https://data-seed-prebsc-1-s2.bnbchain.org:8545",
      "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
      "https://data-seed-prebsc-1-s3.bnbchain.org:8545",
      "https://data-seed-prebsc-2-s3.bnbchain.org:8545",
      "https://bsc-testnet-rpc.publicnode.com",
      "wss://bsc-testnet-rpc.publicnode.com"
    ],
    "faucets": [
      "https://testnet.bnbchain.org/faucet-smart"
    ],
    "nativeCurrency": {
      "name": "BNB Chain Native Token",
      "symbol": "tBNB",
      "decimals": 18
    },
    "infoURL": "https://www.bnbchain.org/en",
    "shortName": "bnbt",
    "chainId": 97,
    "networkId": 97,
    "slip44": 1,
    "explorers": [
      {
        "name": "bscscan-testnet",
        "url": "https://testnet.bscscan.com",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Gnosis",
    "chain": "GNO",
    "icon": "gnosis",
    "rpc": [
      "https://rpc.gnosischain.com",
      "https://rpc.gnosis.gateway.fm",
      "https://rpc.ankr.com/gnosis",
      "https://gnosischain-rpc.gateway.pokt.network",
      "https://gnosis-mainnet.public.blastapi.io",
      "https://gnosis.api.onfinality.io/public",
      "https://gnosis.blockpi.network/v1/rpc/public",
      "https://web3endpoints.com/gnosischain-mainnet",
      "https://gnosis.oat.farm",
      "wss://rpc.gnosischain.com/wss",
      "https://gnosis-rpc.publicnode.com",
      "wss://gnosis-rpc.publicnode.com"
    ],
    "faucets": [
      "https://gnosisfaucet.com",
      "https://stakely.io/faucet/gnosis-chain-xdai",
      "https://faucet.prussia.dev/xdai"
    ],
    "nativeCurrency": {
      "name": "xDAI",
      "symbol": "XDAI",
      "decimals": 18
    },
    "infoURL": "https://docs.gnosischain.com",
    "shortName": "gno",
    "chainId": 100,
    "networkId": 100,
    "slip44": 700,
    "explorers": [
      {
        "name": "gnosisscan",
        "url": "https://gnosisscan.io",
        "standard": "EIP3091"
      },
      {
        "name": "blockscout",
        "url": "https://gnosis.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://gnosis.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Polygon Mainnet",
    "chain": "Polygon",
    "icon": "polygon",
    "rpc": [
      "https://polygon-rpc.com/",
      "https://rpc-mainnet.matic.network",
      "https://matic-mainnet.chainstacklabs.com",
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet-full-rpc.bwarelabs.com",
      "https://polygon-bor-rpc.publicnode.com",
      "wss://polygon-bor-rpc.publicnode.com",
      "https://polygon.gateway.tenderly.co",
      "wss://polygon.gateway.tenderly.co",
      "https://polygon.drpc.org",
      "wss://polygon.drpc.org"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    },
    "infoURL": "https://polygon.technology/",
    "shortName": "matic",
    "chainId": 137,
    "networkId": 137,
    "slip44": 966,
    "explorers": [
      {
        "name": "polygonscan",
        "url": "https://polygonscan.com",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://polygon.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Fantom Opera",
    "chain": "FTM",
    "rpc": [
      "https://rpc.ftm.tools",
      "https://fantom-rpc.publicnode.com",
      "wss://fantom-rpc.publicnode.com",
      "https://fantom.drpc.org",
      "wss://fantom.drpc.org"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Fantom",
      "symbol": "FTM",
      "decimals": 18
    },
    "infoURL": "https://fantom.foundation",
    "shortName": "ftm",
    "chainId": 250,
    "networkId": 250,
    "icon": "fantom",
    "explorers": [
      {
        "name": "ftmscan",
        "url": "https://ftmscan.com",
        "icon": "ftmscan",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://fantom.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Moonbeam",
    "chain": "MOON",
    "rpc": [
      "https://rpc.api.moonbeam.network",
      "wss://wss.api.moonbeam.network",
      "https://moonbeam-rpc.publicnode.com",
      "wss://moonbeam-rpc.publicnode.com",
      "https://moonbeam.drpc.org",
      "wss://moonbeam.drpc.org"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Glimmer",
      "symbol": "GLMR",
      "decimals": 18
    },
    "infoURL": "https://moonbeam.network/networks/moonbeam/",
    "shortName": "mbeam",
    "chainId": 1284,
    "networkId": 1284,
    "explorers": [
      {
        "name": "moonscan",
        "url": "https://moonbeam.moonscan.io",
        "standard": "none"
      }
    ]
  },
  {
    "name": "Fantom Testnet",
    "chain": "FTM",
    "rpc": [
      "https://rpc.testnet.fantom.network",
      "https://fantom-testnet-rpc.publicnode.com",
      "wss://fantom-testnet-rpc.publicnode.com",
      "https://fantom-testnet.drpc.org",
      "wss://fantom-testnet.drpc.org"
    ],
    "faucets": [
      "https://faucet.fantom.network"
    ],
    "nativeCurrency": {
      "name": "Fantom",
      "symbol": "FTM",
      "decimals": 18
    },
    "infoURL": "https://docs.fantom.foundation/quick-start/short-guide#fantom-testnet",
    "shortName": "tftm",
    "chainId": 4002,
    "networkId": 4002,
    "slip44": 1,
    "icon": "fantom",
    "explorers": [
      {
        "name": "ftmscan",
        "url": "https://testnet.ftmscan.com",
        "icon": "ftmscan",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Base",
    "chain": "ETH",
    "rpc": [
      "https://mainnet.base.org/",
      "https://developer-access-mainnet.base.org/",
      "https://base.gateway.tenderly.co",
      "wss://base.gateway.tenderly.co",
      "https://base-rpc.publicnode.com",
      "wss://base-rpc.publicnode.com"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://base.org",
    "shortName": "base",
    "chainId": 8453,
    "networkId": 8453,
    "icon": "base",
    "explorers": [
      {
        "name": "basescan",
        "url": "https://basescan.org",
        "standard": "none"
      },
      {
        "name": "basescout",
        "url": "https://base.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://base.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ],
    "status": "active"
  },
  {
    "name": "Gnosis Chiado Testnet",
    "chain": "GNO",
    "icon": "gnosis",
    "rpc": [
      "https://rpc.chiadochain.net",
      "https://rpc.chiado.gnosis.gateway.fm",
      "wss://rpc.chiadochain.net/wss",
      "https://gnosis-chiado-rpc.publicnode.com",
      "wss://gnosis-chiado-rpc.publicnode.com",
      "https://gnosis-chiado.drpc.org",
      "wss://gnosis-chiado.drpc.org"
    ],
    "faucets": [
      "https://gnosisfaucet.com"
    ],
    "nativeCurrency": {
      "name": "Chiado xDAI",
      "symbol": "XDAI",
      "decimals": 18
    },
    "infoURL": "https://docs.gnosischain.com",
    "shortName": "chi",
    "chainId": 10200,
    "networkId": 10200,
    "slip44": 1,
    "explorers": [
      {
        "name": "blockscout-chiadochain",
        "url": "https://blockscout.chiadochain.net",
        "icon": "blockscout",
        "standard": "EIP3091"
      },
      {
        "name": "blockscout",
        "url": "https://gnosis-chiado.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Holesky",
    "title": "Ethereum Testnet Holesky",
    "chain": "ETH",
    "rpc": [
      "https://rpc.holesky.ethpandaops.io",
      "https://ethereum-holesky-rpc.publicnode.com",
      "wss://ethereum-holesky-rpc.publicnode.com",
      "https://holesky.drpc.org",
      "wss://holesky.drpc.org"
    ],
    "faucets": [
      "https://faucet.holesky.ethpandaops.io",
      "https://holesky-faucet.pk910.de"
    ],
    "nativeCurrency": {
      "name": "Testnet ETH",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://holesky.ethpandaops.io",
    "shortName": "holesky",
    "chainId": 17000,
    "networkId": 17000,
    "slip44": 1,
    "icon": "ethereum",
    "status": "incubating",
    "explorers": [
      {
        "name": "Holesky Explorer",
        "url": "https://holesky.beaconcha.in",
        "icon": "ethereum",
        "standard": "EIP3091"
      },
      {
        "name": "otterscan-holesky",
        "url": "https://holesky.otterscan.io",
        "icon": "ethereum",
        "standard": "EIP3091"
      },
      {
        "name": "Holesky Etherscan",
        "url": "https://holesky.etherscan.io",
        "icon": "ethereum",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Arbitrum One",
    "chainId": 42161,
    "shortName": "arb1",
    "chain": "ETH",
    "networkId": 42161,
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpc": [
      "https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}",
      "https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}",
      "https://arb1.arbitrum.io/rpc",
      "https://arbitrum-one.publicnode.com",
      "wss://arbitrum-one.publicnode.com"
    ],
    "faucets": [],
    "explorers": [
      {
        "name": "Arbiscan",
        "url": "https://arbiscan.io",
        "standard": "EIP3091"
      },
      {
        "name": "Arbitrum Explorer",
        "url": "https://explorer.arbitrum.io",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://arbitrum.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ],
    "infoURL": "https://arbitrum.io",
    "parent": {
      "type": "L2",
      "chain": "eip155-1",
      "bridges": [
        {
          "url": "https://bridge.arbitrum.io"
        }
      ]
    }
  },
  {
    "name": "Avalanche Fuji Testnet",
    "chain": "AVAX",
    "icon": "avax",
    "rpc": [
      "https://api.avax-test.network/ext/bc/C/rpc",
      "https://avalanche-fuji-c-chain-rpc.publicnode.com",
      "wss://avalanche-fuji-c-chain-rpc.publicnode.com"
    ],
    "faucets": [
      "https://faucet.avax-test.network/"
    ],
    "nativeCurrency": {
      "name": "Avalanche",
      "symbol": "AVAX",
      "decimals": 18
    },
    "infoURL": "https://cchain.explorer.avax-test.network",
    "shortName": "Fuji",
    "chainId": 43113,
    "networkId": 1,
    "slip44": 1,
    "explorers": [
      {
        "name": "snowtrace",
        "url": "https://testnet.snowtrace.io",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Avalanche C-Chain",
    "chain": "AVAX",
    "icon": "avax",
    "rpc": [
      "https://api.avax.network/ext/bc/C/rpc",
      "https://avalanche-c-chain-rpc.publicnode.com",
      "wss://avalanche-c-chain-rpc.publicnode.com"
    ],
    "features": [
      {
        "name": "EIP1559"
      }
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Avalanche",
      "symbol": "AVAX",
      "decimals": 18
    },
    "infoURL": "https://www.avax.network/",
    "shortName": "avax",
    "chainId": 43114,
    "networkId": 43114,
    "slip44": 9005,
    "explorers": [
      {
        "name": "snowtrace",
        "url": "https://snowtrace.io",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Linea",
    "title": "Linea Mainnet",
    "chain": "ETH",
    "rpc": [
      "https://rpc.linea.build",
      "wss://rpc.linea.build",
      "https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}",
      "wss://linea-mainnet.infura.io/ws/v3/${INFURA_API_KEY}"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Linea Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://linea.build",
    "shortName": "linea",
    "chainId": 59144,
    "networkId": 59144,
    "icon": "linea",
    "parent": {
      "type": "L2",
      "chain": "eip155-1",
      "bridges": [
        {
          "url": "https://bridge.linea.build"
        }
      ]
    },
    "explorers": [
      {
        "name": "Etherscan",
        "url": "https://lineascan.build",
        "standard": "EIP3091",
        "icon": "linea"
      },
      {
        "name": "Blockscout",
        "url": "https://explorer.linea.build",
        "standard": "EIP3091",
        "icon": "linea"
      },
      {
        "name": "L2scan",
        "url": "https://linea.l2scan.co",
        "standard": "EIP3091",
        "icon": "linea"
      }
    ],
    "status": "active"
  },
  {
    "name": "Mumbai",
    "title": "Polygon Testnet Mumbai",
    "chain": "Polygon",
    "icon": "polygon",
    "rpc": [
      "https://rpc-mumbai.maticvigil.com",
      "https://polygon-mumbai-bor-rpc.publicnode.com",
      "wss://polygon-mumbai-bor-rpc.publicnode.com",
      "https://polygon-mumbai.gateway.tenderly.co",
      "wss://polygon-mumbai.gateway.tenderly.co"
    ],
    "faucets": [
      "https://faucet.polygon.technology/"
    ],
    "nativeCurrency": {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    },
    "infoURL": "https://polygon.technology/",
    "shortName": "maticmum",
    "chainId": 80001,
    "networkId": 80001,
    "slip44": 1,
    "explorers": [
      {
        "name": "polygonscan",
        "url": "https://mumbai.polygonscan.com",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Amoy",
    "title": "Polygon Amoy Testnet",
    "chain": "Polygon",
    "icon": "polygon",
    "rpc": [
      "https://rpc-amoy.polygon.technology",
      "https://polygon-amoy-bor-rpc.publicnode.com",
      "wss://polygon-amoy-bor-rpc.publicnode.com"
    ],
    "faucets": [
      "https://faucet.polygon.technology/"
    ],
    "nativeCurrency": {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    },
    "infoURL": "https://polygon.technology/",
    "shortName": "polygonamoy",
    "chainId": 80002,
    "networkId": 80002,
    "slip44": 1,
    "explorers": [
      {
        "name": "polygonamoy",
        "url": "https://www.oklink.com/amoy",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Base Goerli Testnet",
    "chain": "ETH",
    "rpc": [
      "https://goerli.base.org",
      "https://base-goerli.gateway.tenderly.co",
      "wss://base-goerli.gateway.tenderly.co",
      "https://base-goerli-rpc.publicnode.com",
      "wss://base-goerli-rpc.publicnode.com"
    ],
    "faucets": [
      "https://www.coinbase.com/faucets/base-ethereum-goerli-faucet"
    ],
    "nativeCurrency": {
      "name": "Goerli Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://base.org",
    "shortName": "basegor",
    "chainId": 84531,
    "networkId": 84531,
    "slip44": 1,
    "icon": "baseTestnet",
    "explorers": [
      {
        "name": "basescan",
        "url": "https://goerli.basescan.org",
        "standard": "none"
      },
      {
        "name": "basescout",
        "url": "https://base-goerli.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      },
      {
        "name": "dexguru",
        "url": "https://base-goerli.dex.guru",
        "icon": "dexguru",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Base Sepolia Testnet",
    "chain": "ETH",
    "rpc": [
      "https://sepolia.base.org",
      "https://base-sepolia-rpc.publicnode.com",
      "wss://base-sepolia-rpc.publicnode.com"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Sepolia Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://base.org",
    "shortName": "basesep",
    "chainId": 84532,
    "networkId": 84532,
    "slip44": 1,
    "icon": "baseTestnet",
    "explorers": [
      {
        "name": "basescout",
        "url": "https://base-sepolia.blockscout.com",
        "icon": "blockscout",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "IVAR Chain Mainnet",
    "chain": "IVAR",
    "icon": "ivar",
    "rpc": [
      "https://mainnet-rpc.ivarex.com"
    ],
    "faucets": [
      "https://faucet.ivarex.com/"
    ],
    "nativeCurrency": {
      "name": "Ivar",
      "symbol": "IVAR",
      "decimals": 18
    },
    "infoURL": "https://ivarex.com",
    "shortName": "ivar",
    "chainId": 88888,
    "networkId": 88888,
    "explorers": [
      {
        "name": "ivarscan",
        "url": "https://ivarscan.com",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Arbitrum Goerli",
    "title": "Arbitrum Goerli Rollup Testnet",
    "chainId": 421613,
    "shortName": "arb-goerli",
    "chain": "ETH",
    "networkId": 421613,
    "slip44": 1,
    "nativeCurrency": {
      "name": "Arbitrum Goerli Ether",
      "symbol": "AGOR",
      "decimals": 18
    },
    "rpc": [
      "https://goerli-rollup.arbitrum.io/rpc",
      "https://arbitrum-goerli.publicnode.com",
      "wss://arbitrum-goerli.publicnode.com"
    ],
    "faucets": [],
    "infoURL": "https://arbitrum.io/",
    "explorers": [
      {
        "name": "Arbitrum Goerli Arbiscan",
        "url": "https://goerli.arbiscan.io",
        "standard": "EIP3091"
      }
    ],
    "parent": {
      "type": "L2",
      "chain": "eip155-5",
      "bridges": [
        {
          "url": "https://bridge.arbitrum.io/"
        }
      ]
    }
  },
  {
    "name": "Sepolia",
    "title": "Ethereum Testnet Sepolia",
    "chain": "ETH",
    "rpc": [
      "https://rpc.sepolia.org",
      "https://rpc2.sepolia.org",
      "https://rpc-sepolia.rockx.com",
      "https://rpc.sepolia.ethpandaops.io",
      "https://sepolia.infura.io/v3/${INFURA_API_KEY}",
      "wss://sepolia.infura.io/v3/${INFURA_API_KEY}",
      "https://sepolia.gateway.tenderly.co",
      "wss://sepolia.gateway.tenderly.co",
      "https://ethereum-sepolia-rpc.publicnode.com",
      "wss://ethereum-sepolia-rpc.publicnode.com",
      "https://sepolia.drpc.org",
      "wss://sepolia.drpc.org"
    ],
    "faucets": [
      "http://fauceth.komputing.org?chain=11155111&address=${ADDRESS}"
    ],
    "nativeCurrency": {
      "name": "Sepolia Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://sepolia.otterscan.io",
    "shortName": "sep",
    "chainId": 11155111,
    "networkId": 11155111,
    "slip44": 1,
    "explorers": [
      {
        "name": "etherscan-sepolia",
        "url": "https://sepolia.etherscan.io",
        "standard": "EIP3091"
      },
      {
        "name": "otterscan-sepolia",
        "url": "https://sepolia.otterscan.io",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Palm",
    "chain": "Palm",
    "icon": "palm",
    "rpc": [
      "https://palm-mainnet.infura.io/v3/${INFURA_API_KEY}",
      "https://palm-mainnet.public.blastapi.io"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "PALM",
      "symbol": "PALM",
      "decimals": 18
    },
    "infoURL": "https://palm.network",
    "shortName": "palm",
    "chainId": 11297108109,
    "networkId": 11297108109,
    "explorers": [
      {
        "name": "Chainlens",
        "url": "https://palm.chainlens.com",
        "standard": "EIP3091"
      },
      {
        "name": "Dora",
        "url": "https://www.ondora.xyz/network/palm",
        "standard": "none"
      }
    ]
  }
];