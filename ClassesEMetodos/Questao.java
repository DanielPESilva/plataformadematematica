package ClassesEMetodos;

public class Questao {
    private int id;
    private int posicao;
    private String titulo;
    private String pdf;
    private String link_video;

    public Questao(int id, int posicao, String titulo, String pdf, String link_video) {
        this.id = id;
        this.posicao = posicao;
        this.titulo = titulo;
        this.pdf = pdf;
        this.link_video = link_video;


    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPosicao() {
        return posicao;
    }

    public void setPosicao(int posicao) {
        this.posicao = posicao;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPdf() {
        return pdf;
    }

    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    public String getLink_video() {
        return link_video;
    }

    public void setLink_video(String link_video) {
        this.link_video = link_video;
    }
}
