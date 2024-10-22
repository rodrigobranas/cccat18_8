module.exports = {
	apps: [
		{
			name: 'ride',
			script: 'npx ts-node backend/ride/src/main.ts',
		},
		{
			name: 'account',
			script: 'npx ts-node backend/account/src/main.ts'
		},
		{
			name: 'payment',
			script: 'npx ts-node backend/payment/src/main.ts',
		},
		{
			name: 'invoice',
			script: 'npx ts-node backend/invoice/src/main.ts',
		},
		{
			name: 'query',
			script: 'npx ts-node backend/query/src/main.ts',
		}
	]
};
