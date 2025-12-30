<template>
    <div>
      
      <div id="loading" v-if="!showReport">
        <client-only>
          <LoadingGif />
        </client-only>
      </div>
      <div id="page-a3" v-if="showReport">
        <client-only>
          <!-- Section 1 -->
          <section-v :borderStyle="['none', 'dashed', 'none','none']">
            <section-h style="height:5.55%;padding-top:1%;">
              <LogoSegdi style="float:left;height:77px;width:590px;" />
              <LogoMapea type="red" style="float:right;height:70px;	width: 149px;" />
            </section-h>
  
            <section-h style="height: 28.57%;width:100%;">
              <div style="height:100%;width:59%;float:left;">
                <Map />
                <!-- TODO -->
              </div>
              <div style="height:100%;width:41%;float:left;">
                <div style="height:45%;width:100%">
                  <Zona />
                </div>
                <div style="height:55%;width:100%">
                  <Poblacion />
                </div>
              </div>
            </section-h>
  
            <section-h style="height: 5.44%;width: 100%;">
              <div style="width:100%;height:100%">
                <ProyeccionPoblacion />
              </div>
            </section-h>
  
            <section-h style="height:15%;width:100%;">
              <div style="height:100%;width:33%;float:left">
                <PobrezaNoMonetaria />
                <!--Pobreza/-->
              </div>
              <div style="height:100%;width:65.6%;float:left;margin-left:10px;">
                <AguaSaneamiento />
              </div>
            </section-h>
  
            <section-h style="height:27%;width:100%;">
              <div style="height:100%;width:100%;float:left">
                <Salud />
              </div>
            </section-h>
  
            <section-h style="height:15%;width:100%;">
              <!--Educacion/-->
              <BrechaDigital />
              <div
                style="vertical-align: middle;padding-top: 6px;padding-left:6px;color:rgb(147, 57, 27);"
              >
                <label>Elaborado por equipo técnico de GEO PERÚ</label>
              </div>
            </section-h>
          </section-v>
          <!-- #end Section 1 -->
  
          <!-- Section 2 -->
          <section-v :padding="[0, 0, 0, 4]">
            <section-h
              style="border-radius:5px 0px 0px 5px;background-color:rgb(246, 246, 246);height:45%;width:100%;padding:6px 0px 6px 6px;"
            >
              <div
                style="width:100%;height:48%;background-color:#ebf3ff;border-radius:5px 0 0 5px;margin-bottom:1%;"
              >
                <div style="width:100%;height:10%;text-align:right;">
                  <label style="font-size: 20px;margin-right:2px;" v-if="$store.getters['reporte/tipo'] !== 'dpto'" >Presupuesto de la Municipalidad</label>
                  <label style="font-size: 20px;margin-right:2px;" v-else-if="!$store.getters['reporte/isMancomunidad'] && $store.getters['reporte/tipo'] === 'dpto' && $store.getters['reporte/results'].ejecutora[0].ubigeo === '26'" >Presupuesto de la MUNICIPALIDAD</label>
                  <label style="font-size: 20px;margin-right:2px;" v-else-if="$store.getters['reporte/isMancomunidad']" >Presupuesto de la MANCOMUNIDAD</label>
                  <label style="font-size: 20px;margin-right:2px;" v-else>Presupuesto del GOBIERNO REGIONAL</label>
                </div>
                <div style="width:100%;height:5%;">
                  <PresupuestoLegend :tipo="3" />
                </div>
                <div style="width:50%;height:85%;float:left;">
                  <VerticalBarChart
                    :data="$store.getters['reporte/results'].ejecucion.filter((obj)=>obj.ano_eje ==='2021')[0]"
                    :legendClass="3"
                    :legendColor="3"
                  />
                </div>
                <div style="width:50%;height:85%;float:left;">
                  <VerticalBarChart
                    :data="$store.getters['reporte/results'].ejecucion.filter((obj)=>obj.ano_eje ==='2022')[0]"
                    :legendClass="3"
                    :legendColor="3"
                  />
                </div>
              </div>
              <div style="width:100%;height:48%;background-color:#ebf3ff;border-radius:5px 0 0 5px">
                <div style="width:100%;height:10%;text-align:right;">
                  <label
                    v-if="$store.getters['reporte/results'].ejecutora[0].ubigeo.substring(4,6) === '01' && $store.getters['reporte/tipo'] != 'dpto'"
                    style="font-size: 20px;margin-right:2px;"
                  >Presupuesto de las Municipalidades</label>
                  <label
                    v-if="$store.getters['reporte/results'].ejecutora[0].ubigeo.substring(4,6) !== '01' && $store.getters['reporte/tipo'] != 'dpto'"
                    style="font-size: 20px;margin-right:2px;"
                  >Presupuesto de la Municipalidad</label>
                   <label
                    v-if="$store.getters['reporte/isMancomunidad']"
                    style="font-size: 20px;margin-right:2px;"
                  >Presupuesto de los Gobiernos Regionales</label>
                  <label
                    v-if="$store.getters['reporte/tipo'] === 'dpto' && $store.getters['reporte/isMancomunidad'] === false"
                    style="font-size: 20px;margin-right:2px;"
                  >Presupuesto de las Municipalidades Provinciales y Distritales</label>
                </div>
                <div style="width:100%;height:5%;">
                  <PresupuestoLegend :tipo="3" />
                </div>
                <div style="width:50%;height:85%;float:left;">
                  <VerticalBarChart
                    :data="$store.getters['reporte/results'].ejecuciontotal.filter((obj)=>obj.ano_eje ==='2021')[0]"
                    :legendClass="3"
                    :legendColor="3"
                  />
                </div>
                <div style="width:50%;height:85%;float:left;">
                  <VerticalBarChart
                    :data="$store.getters['reporte/results'].ejecuciontotal.filter((obj)=>obj.ano_eje ==='2022')[0]"
                    :legendClass="3"
                    :legendColor="3"
                  />
                </div>
              </div>
              <Fuente
                style="height:3%;"
                :label="`Fuente: MEF - Consulta Amigable, actualización al <strong>${$store.getters['reporte/results'].mef[0].fecha}</strong>`"
              />
              <!--span class="fuente">
                Fuente: MEF - Consulta Amigable, actualización al
                <span
                  v-text="$store.getters['reporte/results'].mef[0].fecha"
                ></span>
              </span-->
            </section-h>
            <section-h style="height:53%;width:100%;">
              <PrincipalesIndicadores />
            </section-h>
          </section-v>
  
          <!-- #end Section 2 -->
  
          <!-- Section 3 -->
          <section-v :borderStyle="['none', 'none', 'none','dashed']" :padding="[0, 4, 0, 0]">
            <div
              style="float:right;text-align:center;position:absolute;right:42px;"
              data-html2canvas-ignore
              id="rpt-controls"
            >
              <div
                style="height:100%;line-height:18px;text-align:center;display:table;width:100%;font-size:18px;"
              >
                <div
                  style="display:table-cell;vertical-align: middle;text-align:right;font-weight:600;"
                >
                  <button
                    @click="showShare=!showShare"
                    class="btn r-btn no-print"
                    style="background-color:transparent;color:#009aff;"
                    
                  >
                    <img :src="STATIC_URL + 'fonts/icon-share.svg'" width="26px" />
                  </button>
                  <button
                    @click="show"
                    class="btn r-btn no-print"
                    style="background-color:transparent;color:#db5e5e;"
                    
                    :disabled="$store.getters['Loading/isLoading']"
                  >
                    <i class="far fa-file-pdf"></i>
                  </button>
                  <button
                    @click="print"
                    class="btn r-btn no-print"
                    data-toggle="tooltip"
                    data-placement="right"
                    style="background-color:transparent;color:gray;"
                    
                  >
                    <i class="fa fa-print"></i>
                  </button>
                </div>
              </div>
  
              <div v-show="showShare" class="no-print">
                <div id="share"></div>
              </div>
  
              <!--ShareSocials :url="$route.query.page" :description="$store.getters['reporte/description']" v-show="showShare" class="no-print" /-->
  
            </div>
            <!--Options /-->
            <section-h
              style="border-radius:0px 0px 5px 5px;background-color:rgb(246, 246, 246);height:45%;width:100%;padding:6px 6px 6px 0px;"
            >
              <div
                style="width:100%;height:48%;background-color:#ebf3ff;border-radius:0px 5px 5px 0px;margin-bottom:1%;"
              >
                <div style="width:100%;height:10%;text-align:left;">
                  <label style="font-size: 20px;margin-left:2px;" v-if="$store.getters['reporte/tipo'] !== 'dpto'">
                    Provincial de
                    <span
                      v-text="$store.getters['reporte/results'].ejecutora[0].nom_prov +', 2021-2023 (S/)'"
                    ></span>
                  </label>
                  <label style="font-size: 20px;margin-left:2px;" v-else-if="$store.getters['reporte/isMancomunidad']">
                    REGIONAL DE LOS ANDES
                    <span
                      v-text="$store.getters['reporte/results'].ejecutora[0].nom_prov +', 2021-2023 (S/)'"
                    ></span>
                  </label>
                  <label style="font-size: 20px;margin-left:2px;" v-else>
                    DE
                    <span
                      v-text="$store.getters['reporte/results'].ejecutora[0].nom_dpto +', 2021-2023 (S/)'"
                    ></span>
                  </label>
                </div>
                <div style="width:100%;height:5%;">
                  <PresupuestoLegend :tipo="trimestre" />
                </div>
                <div style="width:80%;height:85%;margin:auto;">
                  <VerticalBarChart
                    :data="$store.getters['reporte/results'].ejecucion.filter((obj)=>obj.ano_eje ==='2023')[0]"
                    :legendClass="trimestre"
                    :legendColor="trimestre"
                  />
                </div>
              </div>
              <div
                style="width:100%;height:48%;background-color:#ebf3ff;border-radius:0px 5px 5px 0px;"
              >
                <div style="width:100%;height:10%;text-align:left;">
                  <label
                    v-if="$store.getters['reporte/results'].ejecutora[0].ubigeo.substring(4,6) === '01' && $store.getters['reporte/tipo'] !== 'dpto'"
                    style="font-size: 20px;margin-left:2px;"
                  >
                    Distritales de la provincia de
                    <span
                      v-text="$store.getters['reporte/results'].ejecutora[0].nom_prov + ', 2021-2023 (S/)'"
                    ></span>
                  </label>
                  <label
                    v-if="$store.getters['reporte/results'].ejecutora[0].ubigeo.substring(4,6) !== '01' && $store.getters['reporte/tipo'] !== 'dpto'"
                    style="font-size: 20px;margin-left:2px;"
                  >
                    Distrital de
                    <span
                      v-text="$store.getters['reporte/results'].ejecutora[0].nom_dist + ', 2021-2023 (S/)'"
                    ></span>
                  </label>
                  <label
                    v-if="$store.getters['reporte/isMancomunidad'] === false && $store.getters['reporte/tipo'] === 'dpto' && $store.getters['reporte/results'].ejecutora[0].ubigeo !== '26'"
                    style="font-size: 20px;margin-left:2px;"
                  >
                    del departamento de
                    <!--span
                      v-text="$store.getters['reporte/results'].ejecutora[0].nombre + ', 2018-2020 (S/)'"
                    ></span-->
                    <span
                      v-text="$store.getters['reporte/results'].ejecutora[0].nom_dpto + ', 2021-2023 (S/)'"
                    ></span>
                  </label>
                  <label
                    v-if="$store.getters['reporte/isMancomunidad'] === false && $store.getters['reporte/tipo'] === 'dpto' && $store.getters['reporte/results'].ejecutora[0].ubigeo == '26'"
                    style="font-size: 20px;margin-left:2px;"
                  >
                    de la MUNICIPALIDAD DE 
                    <span
                      v-text="'LIMA METROPOLITANA, 2021-2023 (S/)'"
                    ></span>
                  </label>
                  <label
                    v-else-if="$store.getters['reporte/isMancomunidad']"
                    style="font-size: 20px;margin-left:2px;"
                  >
                    de la MANCOMUNIDAD
                    <span
                      v-text="'REGIONAL DE LOS ANDES, 2021-2023 (S/)'"
                    ></span>
                  </label>
                </div>
                <div style="width:100%;height:5%;">
                  <PresupuestoLegend :tipo="trimestre" />
                </div>
                <div style="width:80%;height:85%;margin:auto;">
                  <VerticalBarChart
                    :data="$store.getters['reporte/results'].ejecuciontotal.filter((obj)=>obj.ano_eje ==='2023')[0]"
                    :legendClass="trimestre"
                    :legendColor="trimestre"
                  />
                </div>
              </div>
              <Fuente
                style="height:4%;"
                :label="`<strong>Presupuesto:</strong> Presupuesto Institucional Modificado (PIM) <strong style='margin-left:40px;'>Ejecutado:</strong> Devengado`"
              />
            </section-h>
            <section-h style="height:47%;width:100%;padding:6px 6px 6px 2px;">
              <EjecucionPresupuestal />
            </section-h>
            <section-h style="height:5%;width:100%;padding:12px 6px 6px 2px;">
              <Adscrita />
              <br />
              <Enlace color="red" class="pull-right" />
            </section-h>
          </section-v>
          <!-- #end Section 3 -->
  
          <modal height="180" width="250" name="pdf-options" data-html2canvas-ignore>
            <div style="width:100%;height:100%;padding:10px;">
              <button @click="hide" style="float:right;background:transparent;border:none;">X</button>
              <div style="width:100%;text-align:center;">
                <h3></h3>
              </div>
              <div style="width:100%;text-align:center;" class="container-fluid">
                <div class="form-group">
                  <label>Seleccione tamaño de hoja</label>
                  <div class="form-group">
                    <label class="radio-inline">
                      <input type="radio" value="a4" v-model="pdfOptions.page" style="right:auto" />
                      A4
                    </label>
                    <label class="radio-inline">
                      <input type="radio" value="a3" v-model="pdfOptions.page" style="right:auto" />
                      A3
                    </label>
                  </div>
  
                  <!--label>
                    <input type="checkbox" v-model="pdfOptions.includeMap" /> Incluir Mapa
                  </label-->
                </div>
                <button
                    type="button"
                    class="btn btn-primary"
                    style="background-color:#337ab7;border-color:#337ab7"
                    @click="genPdf"
                  >Generar</button>
              </div>
            </div>
          </modal>
        </client-only>
      </div>
    </div>
  </template>
  
  <script>
  import SectionV from "~/components/reportea3/SectionV";
  import SectionH from "~/components/reportea3/SectionH";
  import LogoSegdi from "~/components/LogoSegdi";
  import LogoMapea from "~/components/LogoMapea";
  import Map from "~/components/reportea3/map";
  import Zona from "~/components/reportea3/zona";
  import Poblacion from "~/components/reportea3/poblacion";
  import ProyeccionPoblacion from "~/components/reportea3/proyeccionPoblacion";
  import PrincipalesIndicadores from "~/components/reportea3/PrincipalesIndicadores";
  import PresupuestoLegend from "~/components/reportea3/PresupuestoLegend";
  import EjecucionPresupuestal from "~/components/reportea3/EjecucionPresupuestal";
  import PobrezaNoMonetaria from "~/components/reportea3/PobrezaNoMonetaria";
  import Pobreza from "~/components/reportea3/Pobreza";
  import AguaSaneamiento from "~/components/reportea3/AguaSaneamiento";
  import Salud from "~/components/reportea3/Salud";
  import BrechaDigital from "~/components/reportea3/BrechaDigital";
  
  import VerticalBarChart from "~/components/reportea3/VerticalBarChart";
  import Adscrita from "~/components/reportea3/Adscrita";
  import Enlace from "~/components/Enlace";
  import Options from "~/components/reportea3/Options";
  import Ubigeo from "~/static/ubigeo.js";
  import Fuente from "~/components/reportea3/Fuente";
  import LoadingGif from "~/components/reportea3/LoadingGif";
  import LoadingOverlay from "~/components/LoadingOverlay";
  
  import ShareSocials from "~/components/ShareSocials";
  import gaEvent from "~/mixins/GoogleAnalytics";
  import formatSvgThenScreenShot from "~/mixins/ScreenShot";
  import imageToPdf from "~/mixins/PDFPrint";
  
  const Ubi = require("~/static/ubigeoa.js");
  
  import { STATIC_URL } from "~/const.js"
  
  export default {
    mixins: [gaEvent, formatSvgThenScreenShot, imageToPdf],
    validate({ params }) {
      return Ubigeo.Ubigeo.some(obj => {
        if (
          params.id.indexOf(obj.cod_dist) !== -1 ||
          params.id.indexOf(obj.cod_prov) !== -1 ||
          params.id.indexOf(obj.cod_dpto) !== -1
        ) {
          return true;
        }
      });
    },
    components: {
      SectionV,
      SectionH,
      LogoSegdi,
      Map,
      Zona,
      Poblacion,
      ProyeccionPoblacion,
      PrincipalesIndicadores,
      PobrezaNoMonetaria,
      Pobreza,
      AguaSaneamiento,
      Salud,
      LoadingGif,
      PresupuestoLegend,
      EjecucionPresupuestal,
      LogoMapea,
      BrechaDigital,
      VerticalBarChart,
      Adscrita,
      Enlace,
      Options,
      Fuente,
      ShareSocials,
      LoadingOverlay
    },
    layout: "reporte",
    data: () => {
      return {
        STATIC_URL: STATIC_URL,
        showReport: false,
        showShare: false,
        title: "Reporte",
        description: "Description",
        generatingPdf: 0,
        pdfOptions: {
          page: "a3",
          margin: "0.5", //cm
        },
        map: {
          map_url: "",
          refmapurl: "",
          scaleburl: "",
          scale: ""
        }
      };
    },
  
    mounted() {
      this.codigo = this.$route.params.id;
      this.getResults();
    },
    computed: {
      /**
       * returns Integer
       */
      trimestre(){
          var d = new Date(); // If no date supplied, use today
          var q = [1,2,3,4];
          return q[Math.floor(d.getMonth() / 3)]-1;
      }
    },
    head() {
      return {
        title: "Reporte",
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: "description",
            name: "description",
            content: "Reporte | Brechas | Geo Perú"
          },
          //{ name: "viewport", content: "width=device-width, initial-scale=1" }
        ]
      };
    },
  
    methods: {
      show() {
        this.$modal.show("pdf-options");
      },
      hide() {
        this.$modal.hide("pdf-options");
      },
      genPdf() {
        this.hide()
        this.$store.dispatch("Loading/START", { tipo:'Overlay', text: `Generando Reporte: ${this.$store.getters['reporte/description']}`});
        this.gaEvent("send", "event", "Reporte", "pdf", this.$route.params.id);
  
        const svgElements = $("#page-a3").find(".svg-icon")
        const mainElement = document.querySelector("#page-a3")
  
        this.formatSvgThenScreenShot(svgElements, mainElement).then(screenshot => {
          this.imageToPdf(screenshot).save(`Reporte ${this.$store.getters['reporte/description']}.pdf`)
          this.$store.dispatch("Loading/STOP")
        })
      },
      setSocials() {
        var isMobile = false; //initiate as false
          // device detection
          if (
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
              navigator.userAgent
              ) ||
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              navigator.userAgent.substr(0, 4)
              )
          ) {
              isMobile = true;
          }
  
          jsSocials.shares.whatsapp = {
              label: "WhatsApp",
              logo: "fab fa-whatsapp",
              shareUrl: isMobile
              ? "whatsapp://send?text={url} {text}"
              : "https://web.whatsapp.com/send?text={url} {text}",
              countUrl: ""
          };
  
          $("#share").jsSocials({
              url: this.url,
              shareIn: "blank",
              showLabel: false,
              showCount: false,
              shares: [
              { share: "email", logo: "fas fa-at" },
              { share: "twitter", logo: "fab fa-twitter" },
              { share: "facebook", logo: "fab fa-facebook-f" },
              { share: "whatsapp", logo: "fab fa-whatsapp" },
              { share: "linkedin", logo: "fab fa-linkedin" },
              ],
              text: this.$store.getters["reporte/description"]
          });
      },
      back() {
        this.$router.go(-1);
      },
      print() {
        this.gaEvent(
          "send",
          "event",
          "Reporte",
          "imprimir",
          this.$route.params.id
        );
        window.print();
      },
      getResults() {
        this.$store
          .dispatch("reporte/fetchApi", this.codigo)
          .then(response => {
            if( this.codigo == '151' ) {
              this.$store.dispatch('reporte/isRegion', true)
            }else if( this.cod_dist=='M1'){
              this.$store.dispatch('reporte/isMancomunidad', true)
            }
            this.showReport = true;
          })
          .then(response => {
            this.setSocials();
          })
          .catch(error => {
            console.log(error)
          //   if (error) {
          //     this.$router.push("/");
          //   }
          });
      }
    }
  };
  </script>
  
  <style>
  body {
    overflow-x: scroll;
  }
  
  #page-a3 {
    /*height: 1322px;
    width: 1916px;*/
    font-family: "Montserrat" !important;
  
    position: relative;
    top: 50%;
    margin: 0px auto; /* -height/2 */
  
    /*height: 1682px;
    width: 2384px; no margin*/
  
    /* With Margin 0.5mm */
    height: 1620px !important;
    width: 2340px !important;
  
    /*height: 100%;
    width: 100%;*/
    /*background-color: #ca0707 !important;*/
  }
  
  @media print {
    #page-a3 {
      height: 1620px;
      width: 2330px;
    }
  
  }
  
  #page-a3 *:not(i) {
    font-family: "Montserrat" !important;
  }
  
  .cele * {
    color: #148cf9 !important;
  }
  
  .feedback {
    background-color: #31b0d5;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    border-color: #46b8da;
  }
  
  .fixed {
    position: fixed;
    font-size: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    opacity: 0.8;
  }
  
  .fixed:hover {
    opacity: 1;
  }
  
  /* JS SOCIALS */
  
  .jssocials-share-whatsapp .jssocials-share-link,
  .jssocials-share-linkedin .jssocials-share-link,
  .jssocials-share-facebook .jssocials-share-link,
  .jssocials-share-twitter .jssocials-share-link,
  .jssocials-share-email .jssocials-share-link {
    color: white !important;
    font-size: 15px;
  }
  
  .r-btn {
    font-size: 28px;
    width: 50px;
    height: 35px;
    /*border-radius: 50%;*/
    opacity: 0.9;
    padding: 0px;
  }
  
  .r-btn:hover {
    opacity: 1;
  }
  
  .jssocials-share-link {
    border-radius: 50%;
  }
  
  #page-a3 {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  </style>
  