class FileIO {
    constructor(worldSerializer) {
        this.reader = new FileReader();
        this.worldSerializer = worldSerializer;

        this.fileInput = document.createElement("input");
        this.fileInput.setAttribute("type","file");

        this.reader.onload = (e) => {
            const content = e.target.result;
            this.worldSerializer.deserialize(content);

            this.fileInput.value = '';
        };

        this.fileInput.addEventListener('change', this.readFile.bind(this), false);
    }

    static saveAs(data, filename) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        pom.setAttribute('download', filename);
    
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

    open() {
        this.fileInput.click();
    }

    readFile(e) {
        var file = e.target.files[0];

        if (!file) 
          return;

        this.reader.readAsText(file);
    }
}