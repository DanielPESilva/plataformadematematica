package ClassesEMetodos;

public class Modulo {
    int id;
    private String tema;
    private String descricao;
    private String pdf;
    private String linkVideo;

    public Modulo(int id, String tema, String descricao, String pdf, String linkVideo) {
        this.id = id;
        this.tema = tema;
        this.descricao = descricao;
        this.pdf = pdf;
        this.linkVideo = linkVideo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTema() {
        return tema;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getPdf() {
        return pdf;
    }

    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    public String getLinkVideo() {
        return linkVideo;
    }

    public void setLinkVideo(String linkVideo) {
        this.linkVideo = linkVideo;
    }
}
