//export const OPENHOUSE_ADDRESS = '0xFf3D0372a03118cB6343EAEE7A7918e73982e872';	 // Rinkeby Testnet
export const OPENHOUSE_ADDRESS = '0x01FADe383e9355Fee0481C19d4A6Af260A06e85E'; // Ropsten Testnet
export const OPENHOUSE_CONTRACT: any[] = [
	{
		inputs: [
			{
				internalType: 'string',
				name: 'name',
				type: 'string'
			}
		],
		name: 'addRoom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: 'nonce',
				type: 'string'
			}
		],
		name: 'storeNonce',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'toVerify',
				type: 'address'
			}
		],
		name: 'getNonceForAddress',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'listRooms',
		outputs: [
			{
				internalType: 'string[]',
				name: '',
				type: 'string[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: 'name',
				type: 'string'
			}
		],
		name: 'members',
		outputs: [
			{
				internalType: 'address[]',
				name: '',
				type: 'address[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];
