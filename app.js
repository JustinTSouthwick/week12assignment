//A class for the jobs that can be created
class Job {
    constructor(name, time, date){
        this.name = name;
        this.time = time;
        this.date = date;
    }
}

//a class made to house the api url and functions used throughout the app
class JobService {
    static url ='https://6496f73e83d4c69925a3490b.mockapi.io/job';
    
    static getAllJobs() {
        return $.get(this.url);
    }

    static createJob(job) {
        return $.post(this.url, job);
    }

    static deleteJob(id) {
        return $.ajax({
            url: this.url  + `/${id}`,
            type: 'DELETE'
        });
    }
}

//A class for updating the DOM with info about the jobs
class DOMManager {
    static jobs;

    static getAllJobs() {
        JobService.getAllJobs().then(jobs => this.render(jobs));
    }

    static createJob(a, b, c) {
        JobService.createJob(new Job(a, b, c))
            .then(() => {
                return JobService.getAllJobs();
            })
            .then((jobs) => this.render(jobs));
    }

    static deleteJob(id) {
        JobService.deleteJob(id) 
            .then(() => {
                return JobService.getAllJobs();
            })
            .then((jobs) => this.render(jobs));
    }

    static render(jobs) {
        this.jobs = jobs;
        $('#app').empty();
        for (let job of jobs) {
            $('#app').prepend(
                `<div class="card-body">
                    <div class="card bg-body-tertiary mb-1">
                        <div class="row">
                            <div class="col-sm">
                                <h2>Job Name: ${job.name}</h2>
                                <h3>Est. Time: ${job.time} hours</h3>
                                <h3>Post Date: ${job.date}</h3>
                                <button class="btn btn-danger mt-1 mb-2" onclick="DOMManager.deleteJob('${job.id}')">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            );
        }
    }
}

//giving click functionality to our create job button
$('#create-job').on("click", () => {
    DOMManager.createJob($('#new-job-name').val(), $('#time-estimate').val(), $('#post-date').val());
})

//calling the function to display all of the jobs
DOMManager.getAllJobs();