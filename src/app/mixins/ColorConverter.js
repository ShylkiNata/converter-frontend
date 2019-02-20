export default {
    methods: {
        shadeHexColor(color, percent = -0.2) {
            let f = parseInt(color.slice(1),16),
                t = percent < 0 ? 0 :255,
                p = percent < 0 ? percent*-1 : percent;

            let R = f >> 16,
                G = f >> 8 & 0x00FF,
                B = f & 0x0000FF;

            let h = 0x1000000+(Math.round((t-R)*p) + R),
                s = 0x10000+(Math.round((t-G)*p) + G),
                v = 0x100+(Math.round((t-B)*p) + B);

            return "#"+(h*s*v).toString(16).slice(1);
        },
    }
}