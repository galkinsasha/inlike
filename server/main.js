ServiceConfiguration.configurations.remove({
    service: 'instagram'
});
ServiceConfiguration.configurations.insert({
    service: 'instagram',
    scope: ['basic','public_content', 'follower_list'],
    clientId: '8f0c52b16d52462e9fa8edb30fd96913',
    secret: '47fd852ccb6c4857b437c1e24227ec4c'
});


