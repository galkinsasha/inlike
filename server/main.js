/*ServiceConfiguration.configurations.remove({
    service: 'instagram'
});*/
/*ServiceConfiguration.configurations.insert({
    service: 'instagram',
    scope: ['basic','public_content', 'follower_list'],
    clientId: '8f0c52b16d52462e9fa8edb30fd96913',
    secret: '47fd852ccb6c4857b437c1e24227ec4c'
});*/

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    //prod
    /*appId: '1932628187053957',
    secret: '0d7eccce7d84dce8e808c005c9461197'*/
    //dev
    appId: '165725484176956',
    secret: '5ad6c687c20a3635da69708a00d1a008'
});
