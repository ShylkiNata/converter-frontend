export default {
    methods: {
        shadeHexColor(color, percent = -0.2) {
            let f = parseInt(color.slice(1),16),
                t = percent < 0 ? 0 :255,
                p = percent < 0 ? percent*-1 : percent;

            let R = f >> 16,
                G = f >> 8 & 0x00FF,
                B = f & 0x0000FF;

            let h = Math.round((t-R)*p) + R,
                s = Math.round((t-G)*p) + G,
                v = Math.round((t-B)*p) + B;

            return "#"+(0x1000000+h*0x10000+s*0x100+v).toString(16).slice(1);
        }
    }
}