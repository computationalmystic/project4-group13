var contributionPercentage = 0.2;

$(document).ready(function() {
   getRepoGroupInfo(); 
});

function resetWithFilter() {
    //clear #sectionList and #sectionBody
    contributionPercentage = $("#percentInput").val();
    
    $("#sectionList").empty();
    $("#sectionBody").empty();
    
    getRepoGroupInfo();
}

function getRepoGroupInfo() {
    $.get("https://cors-anywhere.herokuapp.com/http://augur.osshealth.io:5000/api/unstable/repo-groups", function(repodata, status){
        if (status == "success") {
            var repoGroups = repodata;
            repoGroups.forEach((e) => {

                $.get("https://cors-anywhere.herokuapp.com/http://augur.osshealth.io:5000/api/unstable/repo-groups/" + e.repo_group_id + "/top-committers?threshold=1", function(committerData, status){

                    e.committers = committerData;
                    e.committers.pop();

                    e.totalCommits = 0;

                    $("#sectionList").append('<li><a href="#'+ e.repo_group_id + '">'+ e.rg_name + '</a></li>');

                    $("#sectionBody").append('<div id="'+ e.repo_group_id +'"></div>');
                    $("#" + e.repo_group_id).append('<h1>' + e.rg_name + '</h1>');
                    $("#" + e.repo_group_id).append('<canvas id="'+ e.repo_group_id +'-canvas"></canvas>');

                    createGraph(e);

                });
            });
        }
    });   
}


function createGraph(data) {
    var id = data.repo_group_id;
    var committers = data.committers;
    var otherCommits = 0; //this accounts for any commit
    var totalCommits = 0;
    
    committers.forEach(e => {
        totalCommits += e.commits;
    });
    
    var numbers = [];
    var emails = [];
    var bgColors = [];
    var borderColors = [];
    
    committers.forEach(e => { //separate into two arrays
        
        if (e.commits > (totalCommits / 100) * contributionPercentage) {
            numbers.push(e.commits);
            emails.push(e.email);
            
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            bgColors.push("rgba(" + r + "," + g + "," + b + ", 0.5)");
            borderColors.push("rgba(" + r + "," + g + "," + b + ", 0.7)");
        }
        else {
            otherCommits += e.commits;
        }
        
    });
    
    if(otherCommits > 0){
        numbers.push(otherCommits);
        emails.push("Other Contributers");
    }
    
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                borderWidth: 1,
                data: numbers,
                label: data.rg_name,
                backgroundColor: bgColors,
                borderColor: borderColors
            }],
            labels: emails
        },
        options: {
            responsive: true,
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: 'Contributions Per User (Total - '+ totalCommits +')'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
        }
    };
    
    var ctx = document.getElementById(id + "-canvas");
    window.myChart = new Chart(ctx, config);
    
}
