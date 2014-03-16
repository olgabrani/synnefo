Ember.Inflector.inflector.uncountable('account');

Snf.Account = DS.Model.extend({
	email: DS.attr('string')
});

Snf.Account.FIXTURES = [{
	id: 1,
	email: "athina@mail.com"
}];
// accounts that have published or shared image
Snf.AccountsUUIDs = Ember.Object.create({
"3757a587-ea42-4bec-8bfa-1b35da94e86a": "user01@mail.gr",
"847d3f38-9606-43aa-ac66-f53e16b91034": "user02@mail.gr",
"3ae10b0d-122a-45e8-8106-3b46c8427956": "user03@mail.gr",
"5ba7b641-9d74-4407-ac1e-1d58f6225258": "user04@mail.gr",
"1f0a0cb2-12f6-440b-854f-87489e45e682": "user05@mail.gr",
"11317487-1eb8-4669-bbb6-2ab6381f60f3": "user06@mail.gr",
"2bcf1f3d-6faf-49af-be7c-3772d708de3e": "user07@mail.gr",
"5e06c85e-166f-4dec-a5ff-f3931e80a48d": "user08@mail.gr",
"07a108f3-7d8c-4eb5-a652-b5144b92b896": "user09@mail.gr",
"d3394a1a-c107-42b2-be34-65c79486ed1c": "user10@mail.gr",
"f43489df-0331-4302-83e4-554605c65f75": "user11@mail.gr",
"736b4003-ed68-484b-9893-35928e44bc73": "user12@mail.gr",
"4de95599-8065-45a6-96e1-2dd2ed4015df": "user13@mail.gr",
"a7e3f286-943a-4d2d-835a-ab8df14646a7": "user14@mail.gr",
"c5972b99-e823-48c7-80ad-e35be480dfab": "user15@mail.gr",
"534b9f26-0a3b-4964-af0c-4af525538d75": "user16@mail.gr",
"f4a9495-dfc6-46d5-950b-5e26c4a32a4f": "user17@mail.gr",
"aaff1da5-2a98-4e16-ab27-37cb24d6062c": "user18@mail.gr",
"1ef1003b-0f94-4c89-9415-18b7a759e104": "user19@mail.gr",
"8be365b4-5034-4edf-b2a8-eaa7ec51d911": "user20@mail.gr",
"07d39ccb-beaa-4d24-a630-ad6f02f0a842": "user21@mail.gr",
"49e2cb58-b2e5-4daa-897b-38196765b913": "user22@mail.gr",
"61e9793a-55b5-40d4-8bbc-0f8da2dddff0": "user23@mail.gr",
"e06780e5-5222-40a6-8c25-62d74942f8f1": "user24@mail.gr",
"181a0935-57e6-41a0-ad47-7089f73d4e2c": "user25@mail.gr",
"a4809bc1-7278-4722-883c-817e4e8367b1": "user26@mail.gr",
"3fef635b-3529-4fc7-8a48-b185e7fe25bd": "user27@mail.gr",
"a73dd3fc-f67d-49f0-892f-f3ed0bf1316b": "user28@mail.gr",
"4df24393-d83d-4b0e-ab00-0f32684a2de4": "user29@mail.gr"
});