$(document).ready(function() {
   getRepoGroupInfo(); 
});

function getRepoGroupInfo() {
    $.get("http://augur.osshealth.io:5000/api/unstable/repo-groups", function(repodata, status){
        
        var repoGroups = repodata;
        repoGroups.forEach((e) => {
            
            $.get("http://augur.osshealth.io:5000/api/unstable/repo-groups/" + e.repo_group_id + "/pull-request-acceptance-rate", function(pullRate) {
                e.pullRate = pullRate[0].rate;
            });
            
            $.get("http://augur.osshealth.io:5000/api/unstable/repo-groups/" + e.repo_group_id + "/top-committers?threshold=1", function(committerData, status){
                
                e.committers = committerData;
                e.committers.pop();
                
                e.totalCommits = 0;
                    
                $("#sectionList").append('<li><a href="#'+ e.repo_group_id + '">'+ e.rg_name + '</a></li>');
                
                $("#sectionBody").append('<div id="'+ e.repo_group_id +'"></div>');
                $("#" + e.repo_group_id).append('<h1>' + e.rg_name + '</h1>');
                $("#" + e.repo_group_id).append('<canvas id="'+ e.repo_group_id +'-canvas"></canvas>');

                createGraph(e);
                
                /*$("body").append("<ul id="+ e.repo_group_id + "></ul>");
                
                e.committers.forEach((f) => {
                    e.totalCommits += f.commits;
                });
                    
                e.committers.forEach((f) => {
                    
                    var percentage = (f.commits/e.totalCommits) * 100;
                    if (percentage >= 0.1) {
                        $("#" + e.repo_group_id).append("<li>" + f.email + " : " + percentage.toFixed(2) + "%</li>");
                    }
                });*/
            });
        });
    });   
}

function createGraph(data) {
    var id = data.repo_group_id;
    var committers = data.committers;
    var otherCommits = 0; //this accounts for any commit
    
    var numbers = [];
    var emails = [];
    var bgColors = [];
    var borderColors = [];
    
    committers.forEach(e => { //separate into two arrays
        
        if (e.commits > 10) {
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
					text: 'Contributions Per User'
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

/* function getRepoGroupInfo() {
    $.get("http://augur.osshealth.io:5000/api/unstable/repo-groups", function(repodata, status){
        
        var repoGroups = repodata;
        repoGroups.forEach((e) => {
            
            $.get("http://augur.osshealth.io:5000/api/unstable/repo-groups/" + e.repo_group_id + "/repos/21623/pull-request-acceptance-rate", function(pullRate) {
                e.pullRate = pullRate[0].rate;
            });
            
            $.get("http://augur.osshealth.io:5000/api/unstable/repo-groups/" + e.repo_group_id + "/top-committers?threshold=1", function(committerData, status){
                
                e.committers = committerData;
                e.committers.pop();
                $.get("http://augur.osshealth.io:5000/api/unstable/repo-groups/" + e.repo_group_id + "/aggregate-summary?begin_date=1-1-2019", function (aggregatedata) {
                    
                    e.combinedContribution = 0;
                    
                    e.commit_count = aggregatedata[0].commit_count;
                    
                    $("body").append("<h1>" + e.rg_name + "</h1>");
                    $("body").append("<h2>" + e.pullRate + "</h2>");
                    
                    $("body").append("<ul>");
                
                    e.committers.forEach((f) => {
                        
                        var proportion = (f.commits / e.commit_count) * 100;
                        
                        if(proportion >= 0.01) {
                            $("body").append("<li>" + f.email + " : " + proportion.toFixed(2) + "%</li>");
                            e.combinedContribution += proportion;
                        }
                    });
                    
                    e.combinedContribution =  (100 - e.combinedContribution);
                    
                    $("body").append("<li>Other Contributors: " + (e.combinedContribution.toFixed(2)) + "%</li>");
                    $("body").append("</ul>");
                });
            });
        });
    });   
} */