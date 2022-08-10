function runCore(task) {
    this.task = task;

    this.run = run;
    function run() {
        this.task.push(2)
        log(this.task)
    }
}

module.exports = runCore;