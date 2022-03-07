export class Berita {
    constructor(
        public TanggalBerita: Date,
        public KategoriBerita: string,
        public FotoBerita: any,
        public JudulBerita: string,
        public IsiBerita: string,
        public LokasiBerita: string,
        public AuthorBerita: string,
        public IsPopularPosts: boolean
    ) { }
}