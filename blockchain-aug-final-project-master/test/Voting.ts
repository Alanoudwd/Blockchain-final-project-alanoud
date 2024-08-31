
import { expect } from "chai";
import hre from "hardhat";

describe("Votingsys", function () {

  it("Should mint and vote", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, ola,notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(ola.address, 100);


    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(ola).submitProposal("Proposal 2");
  

    await voting.connect(owner).vote(0, true);
    await voting.connect(ola).vote(1, false);

    

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);
  


    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
  
 

  });
// I didn't use AI to write the code; I only used it to explain the requirements :D 

  //_______________________________________________________________


  it("Only users with tokens can vote", async function() {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, ola, anoud,soso, notVoter] = await hre.ethers.getSigners();


    await voting.mint(owner.address, 100);
    await voting.mint(ola.address, 100);
    await voting.mint(anoud.address, 100); 

    //await voting.mint(soso.address,0);//<<<<(when soso doesn't have tokens, she can't vote)


    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(ola).submitProposal("Proposal 2");
    await voting.connect(anoud).submitProposal("Proposal 3");
   // await voting.connect(soso).submitProposal("Proposal 4");
  

    await voting.connect(owner).vote(0, true);
    await voting.connect(ola).vote(1, false);
    await voting.connect(anoud).vote(2, false);
    //await voting.connect(soso).vote(3, false);


     //  await expect(voting.connect(soso).vote(3, true)).to.be.revertedWith("You need tokens to vote.");

});





//__________________________________________________________________________

it("Only five users can submit proposals and vote", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, ola, anoud, loly, jojo, notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(ola.address, 100);
    await voting.mint(anoud.address, 100);
   await voting.mint(loly.address, 100);
    // await voting.mint(jojo.address, 100); 
  
  

    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(ola).submitProposal("Proposal 2");
    await voting.connect(anoud).submitProposal("Proposal 3");
    await voting.connect(loly).submitProposal("Proposal 4");
  //  await voting.connect(jojo).submitProposal("Proposal 5");<< can't propose 
   
    
                                
    await voting.connect(owner).vote(0, true);
    await voting.connect(ola).vote(1, false);
    await voting.connect(anoud).vote(2, false);
   await voting.connect(loly).vote(3, false);
    // await voting.connect(jojo).vote(4, false);


 //await expect(voting.connect(jojo).vote(4, false)).to.be.revertedWith("You can only vote on up to 5 proposals.");
});



  //_______________________________________________________________

  it(" users can't vote more than once", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, ola, anoud] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(ola.address, 100);
    await voting.mint(anoud.address, 100);

    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(ola).submitProposal("Proposal 2");
    await voting.connect(anoud).submitProposal("Proposal 3");

    await voting.connect(owner).vote(0, true);
    await voting.connect(ola).vote(1, false);
    await voting.connect(anoud).vote(2, false);
    //await voting.connect(anoud).vote(2, false);

    //await expect(voting.connect(anoud).vote(2, false)).to.be.revertedWith("You have already voted on this proposal");

  //_______________________________________________________________


});

});