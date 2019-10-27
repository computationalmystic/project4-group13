var monthsToSubtract = 6;

$(document).ready(function() {
    getRepoGroupPullRate();
});

function resetWithFilter() {
    
    $("#sectionList").empty();
    $("#sectionBody").empty();
    
    getRepoGroupPullRate();
}

function getRepoGroupPullRate() {
    $.get("https://augur.osshealth.io:5000/api/unstable/repo-groups", function(repodata, status){
        
        var repoGroups = repodata;
        monthsToSubtract = $("#monthInput").val();
        
        repoGroups.forEach((e) => {
            
            var beginDate = new Date();
            var endDate = new Date();
            
            beginDate.setMonth(beginDate.getMonth() - monthsToSubtract);
            
            var newBeginDate = beginDate.getFullYear() + "-" + (beginDate.getMonth() + 1) + "-" + beginDate.getDate();
            
            var newEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
            console.log(newBeginDate);
            
            $.get("https://augur.osshealth.io:5000/api/unstable/repo-groups/" + e.repo_group_id + "/pull-request-acceptance-rate?begin_date="+ newBeginDate + "&end_date=" + newEndDate, function(pullRate) {
                
                if (pullRate.length > 1) { //we need at least 2 datapoints
                    var rates = [];
                    var weekNums = [];

                    pullRate.forEach((f, index) => {      
                        rates.push(f.rate);
                        weekNums.push(index + 1);
                    });

                    $("#sectionList").append('<li><a href="#'+ e.repo_group_id + '">'+ e.rg_name + '</a></li>');

                    $("#sectionBody").append('<div id="'+ e.repo_group_id +'"></div>');
                    $("#" + e.repo_group_id).append('<h1>' + e.rg_name + '</h1>');
                    $("#" + e.repo_group_id).append('<canvas id="'+ e.repo_group_id +'-canvas"></canvas>');

                    createGraph(rates, weekNums, e);
                }
                
            });
            
        });
    });   
}

function createGraph(rates, weeks, data) {
    var id = data.repo_group_id;
    
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    
    var config = {
        type: 'line',
        data: {
            datasets: [{
                borderWidth: 1,
                borderColor: "rgba(" + r + "," + g + "," + b + ", 0.8)",
                backgroundColor : "rgba(" + r + "," + g + "," + b + ", 0.5)",
                data: rates,
                label: data.rg_name
            }],
            labels: weeks
        },
        options: {
            responsive: true,
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: 'Weekly Pullrate Over Last '+ monthsToSubtract +' Months'
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
