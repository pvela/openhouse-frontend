<script>
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { ROOT_ADDRESS } from '$lib/components/MonoChain.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { OPENHOUSE_ADDRESS, OPENHOUSE_CONTRACT } from '$lib/contracts/openhouse';
	import { RARIBLE_ADDRESS, RARIBLE_READ_CONTRACT } from '$lib/contracts/RaribleCollectible.abi';
	import { writable } from 'svelte/store';
	import create from 'ipfs-http-client';
	//const ipfs = create({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })


	//import getFromIPFS from '$lib/rarible/yourcollectible.svelte';

	const chain = getContext('chain');
	const address = getContext('address');
	const rooms = writable([]);
	const nfts = writable([]);

	export let conferenceId = '';
	const onFormSubmit = () => {
		goto(`/conference/${conferenceId}`);
	};

	let contract;
	$: if (chain && $chain) {
		contract = new $chain.eth.Contract(OPENHOUSE_CONTRACT, OPENHOUSE_ADDRESS);
		const listRooms = contract.methods.listRooms();
		listRooms.call().then((result) => {
			$rooms = result;
		});
	}
	let raribleContract;
	$: if (chain && $chain) {
		raribleContract = new $chain.eth.Contract(RARIBLE_READ_CONTRACT, RARIBLE_ADDRESS);
		const balanceMethod = raribleContract.methods.balanceOf($address);
		balanceMethod.call().then((balance) => {
			console.log("🤗 balance:", balance);
			for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
				try {
					console.log("Getting token index", tokenIndex);
					raribleContract.methods.tokenOfOwnerByIndex($address, tokenIndex).call().then((tokenId) => {
						console.log("tokenId", tokenId);

						const tokenURI = raribleContract.methods.tokenURI(tokenId).call().then((tokenURI) =>{
							console.log("tokenURI", tokenURI);

							const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
							console.log("ipfsHash", ipfsHash);

							//const jsonManifestBuffer = new getFromIPFS(ipfsHash);

							try {
								const jsonManifest = {};//JSON.parse(jsonManifestBuffer.toString());
								console.log("jsonManifest", jsonManifest);
								$nfts.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
							} catch (e) {
								console.log(e);
							}
						})
					});
				} catch (e) {
					console.log(e);
				}
			}
			console.log($nfts);
		});
	}

</script>

{#if $address !== ROOT_ADDRESS}
	<section transition:slide class="join__hero">
		<h1>Join a Conference</h1>
		<form on:submit|preventDefault={onFormSubmit}>
			<input type="text" name="conferenceId" id="conferenceId" bind:value={conferenceId} />
			<Button attach="left" type="submit">Join</Button>
		</form>
	</section>
{/if}
<section>
	<h2>Available Conferences</h2>
	{#if $rooms && $rooms.length}
		<div class="rooms">
			{#each $rooms as room}
				<a href="/conference/{room}">{room}</a>
			{/each}
		</div>
	{:else}
		<p>There are no conferences registered yet. Use the form above to be the first to register.</p>
	{/if}
</section>

<section>
	<h2>Available NFTs to be used as background</h2>
	{#if $nfts && $nfts.length}
			{#each $nfts as item}
				const id = item.id.toNumber();
				const key={item.id.toNumber() + "_" + item.uri + "_" + item.owner}
				<div>
					<span>#{item.id.toNumber()}</span> {item.name}
				</div>
				<div>
				<img src={item.image} alt={item.description} 
				 />
				</div>
				<div>{item.description}</div>
			{/each}
	{:else}
		<p>There are no NFTs in your account</p>
	{/if}
</section>

<style>
	section {
		padding: 24px 48px;
	}
	.join__hero {
		background: rebeccapurple;
		padding: 24px 48px;
		font-size: 48px;
		color: white;
		display: flex;
		flex-direction: column;
	}

	.join__hero h1 {
		margin: 42px auto 12px auto;
		text-align: center;
	}

	.join__hero form {
		display: inline-flex;
		margin: 48px auto 24px auto;
	}

	.join__hero input,
	.join__hero :global(button) {
		border-radius: 12px;
		font-size: 42px;
		height: 64px;
		padding: 12px 24px;
	}
	.join__hero input {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.join__hero :global(button) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.rooms {
		display: flex;
		padding: 12px 0;
	}
	.rooms a {
		padding: 6px 24px 6px 0;
		text-decoration: none;
		font-size: 24px;
		color: royalblue;
	}
	.rooms a:hover,
	.rooms a:visited {
		color: rebeccapurple;
	}
</style>
