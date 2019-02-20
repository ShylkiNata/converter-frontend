export default {
    data() {
        return {
            converters: this.getConverters(),
            compressors: this.getCompressors(),
        }
    },
    methods: {
        getConverters() {
            let types = [
                'PNG to JPG', 'JPG to PNG', 'PDF to PNG',
                'PDF to JPG', 'PNG to PDF', 'JPG to PDF'
            ];
            let icons = [
                'file-image', 'file-image', 'file-image', 'file-image', 'file-pdf', 'file-pdf'
            ];
            let colors = [
                '#f23030', '#ff4c23', '#ff7919', '#ff9f19', '#ebc50c', '#e6d739'
            ];
            return this.compact(types, icons, colors);
        },
        getCompressors() {
            let types = [
                'PDF', 'PNG', 'JPG',
            ];
            let icons = [
                'file-pdf', 'file-image', 'file-image'
            ];
            let colors = [
                '#74d941', '#00cc44', '#0fc0c5'
            ];
            return this.compact(types, icons, colors);
        },
        compact(types, icons, colors) {
            let items = [];

            types.forEach((item,index) => {
                items.push({
                    type: item,
                    icon: icons[index],
                    color: colors[index]
                });
            });

            return items;
        }
    }
}