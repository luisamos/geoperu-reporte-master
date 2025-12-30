<template>
  <div>
    <div id="loading" v-if="!showReport">
      <ClientOnly>
        <LoadingGif />
      </ClientOnly>
    </div>
    <div id="page-a3" v-if="showReport">
      <ClientOnly>
        <!-- Section 1 -->
        <section-v :borderStyle="['none', 'dashed', 'none', 'none']">
          <section-h style="height: 5.55%; padding-top: 1%">
            <LogoSegdi style="float: left; height: 77px; width: 590px" />
            <LogoMapea
              type="red"
              style="float: right; height: 70px; \twidth: 149px"
            />
          </section-h>

          <section-h style="height: 28.57%; width: 100%">
            <div style="height: 100%; width: 59%; float: left">
              <Map />
              <!-- TODO -->
            </div>
            <div style="height: 100%; width: 41%; float: left">
              <div style="height: 45%; width: 100%">
                <Zona />
              </div>
              <div style="height: 55%; width: 100%">
                <Poblacion />
              </div>
            </div>
          </section-h>

          <section-h style="height: 5.44%; width: 100%">
            <div style="width: 100%; height: 100%">
              <ProyeccionPoblacion />
            </div>
          </section-h>

          <section-h style="height: 15%; width: 100%">
            <div style="height: 100%; width: 33%; float: left">
              <PobrezaNoMonetaria />
              <!--Pobreza/-->
            </div>
            <div
              style="height: 100%; width: 65.6%; float: left; margin-left: 10px"
            >
              <AguaSaneamiento />
            </div>
          </section-h>

          <section-h style="height: 27%; width: 100%">
            <div style="height: 100%; width: 100%; float: left">
              <Salud />
            </div>
          </section-h>

          <section-h style="height: 15%; width: 100%">
            <!--Educacion/-->
            <BrechaDigital />
            <div
              style="
                vertical-align: middle;
                padding-top: 6px;
                padding-left: 6px;
                color: rgb(147, 57, 27);
              "
            >
              <label>Elaborado por equipo técnico de GEO PERÚ</label>
            </div>
          </section-h>
        </section-v>
        <!-- #end Section 1 -->

        <!-- Section 2 -->
        <section-v :padding="[0, 0, 0, 4]">
          <section-h
            style="
              border-radius: 5px 0px 0px 5px;
              background-color: rgb(246, 246, 246);
              height: 45%;
              width: 100%;
              padding: 6px 0px 6px 6px;
            "
          >
            <div
              style="
                width: 100%;
                height: 48%;
                background-color: #ebf3ff;
                border-radius: 5px 0 0 5px;
                margin-bottom: 1%;
              "
            >
              <div style="width: 100%; height: 10%; text-align: right">
                <label
                  style="font-size: 20px; margin-right: 2px"
                  v-if="$store.getters['reporte/tipo'] !== 'dpto'"
                  >Presupuesto de la Municipalidad</label
                >
                <label
                  style="font-size: 20px; margin-right: 2px"
                  v-else-if="
                    !$store.getters['reporte/isMancomunidad'] &&
                    $store.getters['reporte/tipo'] === 'dpto' &&
                    $store.getters['reporte/results'].ejecutora[0].ubigeo ===
                      '26'
                  "
                  >Presupuesto de la MUNICIPALIDAD</label
                >
                <label
                  style="font-size: 20px; margin-right: 2px"
                  v-else-if="$store.getters['reporte/isMancomunidad']"
                  >Presupuesto de la MANCOMUNIDAD</label
                >
                <label style="font-size: 20px; margin-right: 2px" v-else
                  >Presupuesto del GOBIERNO REGIONAL</label
                >
              </div>
              <div style="width: 100%; height: 5%">
                <PresupuestoLegend :tipo="3" />
              </div>
              <div style="width: 50%; height: 85%; float: left">
                <VerticalBarChart
                  :data="
                    $store.getters['reporte/results'].ejecucion.filter(
                      (obj) => obj.ano_eje === '2021'
                    )[0]
                  "
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
              <div style="width: 50%; height: 85%; float: left">
                <VerticalBarChart
                  :data="
                    $store.getters['reporte/results'].ejecucion.filter(
                      (obj) => obj.ano_eje === '2022'
                    )[0]
                  "
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
            </div>
            <div
              style="
                width: 100%;
                height: 48%;
                background-color: #ebf3ff;
                border-radius: 5px 0 0 5px;
              "
            >
              <div style="width: 100%; height: 10%; text-align: right">
                <label
                  v-if="
                    $store.getters[
                      'reporte/results'
                    ].ejecutora[0].ubigeo.substring(4, 6) === '01' &&
                    $store.getters['reporte/tipo'] != 'dpto'
                  "
                  style="font-size: 20px; margin-right: 2px"
                  >Presupuesto de las Municipalidades</label
                >
                <label
                  v-if="
                    $store.getters[
                      'reporte/results'
                    ].ejecutora[0].ubigeo.substring(4, 6) !== '01' &&
                    $store.getters['reporte/tipo'] != 'dpto'
                  "
                  style="font-size: 20px; margin-right: 2px"
                  >Presupuesto de la Municipalidad</label
                >
                <label
                  v-if="$store.getters['reporte/isMancomunidad']"
                  style="font-size: 20px; margin-right: 2px"
                  >Presupuesto de los Gobiernos Regionales</label
                >
                <label
                  v-if="
                    $store.getters['reporte/tipo'] === 'dpto' &&
                    $store.getters['reporte/isMancomunidad'] === false
                  "
                  style="font-size: 20px; margin-right: 2px"
                  >Presupuesto de las Municipalidades Provinciales y
                  Distritales</label
                >
              </div>
              <div style="width: 100%; height: 5%">
                <PresupuestoLegend :tipo="3" />
              </div>
              <div style="width: 50%; height: 85%; float: left">
                <VerticalBarChart
                  :data="
                    $store.getters['reporte/results'].ejecuciontotal.filter(
                      (obj) => obj.ano_eje === '2021'
                    )[0]
                  "
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
              <div style="width: 50%; height: 85%; float: left">
                <VerticalBarChart
                  :data="
                    $store.getters['reporte/results'].ejecuciontotal.filter(
                      (obj) => obj.ano_eje === '2022'
                    )[0]
                  "
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
            </div>
            <Fuente
              style="height: 3%"
              :label="`Fuente: MEF - Consulta Amigable, actualización al <strong>${$store.getters['reporte/results'].mef[0].fecha}</strong>`"
            />
            <!--span class="fuente">
              Fuente: MEF - Consulta Amigable, actualización al
              <span
                v-text="$store.getters['reporte/results'].mef[0].fecha"
              ></span>
            </span-->
          </section-h>
          <section-h style="height: 53%; width: 100%">
            <PrincipalesIndicadores />
          </section-h>
        </section-v>

        <!-- #end Section 2 -->

        <!-- Section 3 -->
        <section-v
          :borderStyle="['none', 'none', 'none', 'dashed']"
          :padding="[0, 4, 0, 0]"
        >
          <div
            style="
              float: right;
              text-align: center;
              position: absolute;
              right: 42px;
            "
            data-html2canvas-ignore
            id="rpt-controls"
          >
            <div
              style="
                height: 100%;
                line-height: 18px;
                text-align: center;
                display: table;
                width: 100%;
                font-size: 18px;
              "
            >
              <div
                style="
                  display: table-cell;
                  vertical-align: middle;
                  text-align: right;
                  font-weight: 600;
                "
              >
                <button
                  @click="toggleShare"
                  class="btn r-btn no-print"
                  style="background-color: transparent; color: #009aff"
                >
                  <img :src="staticUrl + 'fonts/icon-share.svg'" width="26px" />
                </button>
                <button
                  @click="openPdfOptions"
                  class="btn r-btn no-print"
                  style="background-color: transparent; color: #db5e5e"
                  :disabled="$store.getters['Loading/isLoading']"
                >
                  <i class="far fa-file-pdf"></i>
                </button>
                <button
                  @click="printReport"
                  class="btn r-btn no-print"
                  data-toggle="tooltip"
                  data-placement="right"
                  style="background-color: transparent; color: gray"
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
            style="
              border-radius: 0px 0px 5px 5px;
              background-color: rgb(246, 246, 246);
              height: 45%;
              width: 100%;
              padding: 6px 6px 6px 0px;
            "
          >
            <div
              style="
                width: 100%;
                height: 48%;
                background-color: #ebf3ff;
                border-radius: 0px 5px 5px 0px;
                margin-bottom: 1%;
              "
            >
              <div style="width: 100%; height: 10%; text-align: left">
                <label
                  style="font-size: 20px; margin-left: 2px"
                  v-if="$store.getters['reporte/tipo'] !== 'dpto'"
                >
                  Provincial de
                  <span
                    v-text="
                      $store.getters['reporte/results'].ejecutora[0].nom_prov +
                      ', 2021-2023 (S/)'
                    "
                  ></span>
                </label>
                <label
                  style="font-size: 20px; margin-left: 2px"
                  v-else-if="$store.getters['reporte/isMancomunidad']"
                >
                  REGIONAL DE LOS ANDES
                  <span
                    v-text="
                      $store.getters['reporte/results'].ejecutora[0].nom_prov +
                      ', 2021-2023 (S/)'
                    "
                  ></span>
                </label>
                <label style="font-size: 20px; margin-left: 2px" v-else>
                  DE
                  <span
                    v-text="
                      $store.getters['reporte/results'].ejecutora[0].nom_dpto +
                      ', 2021-2023 (S/)'
                    "
                  ></span>
                </label>
              </div>
              <div style="width: 100%; height: 5%">
                <PresupuestoLegend :tipo="trimestre" />
              </div>
              <div style="width: 80%; height: 85%; margin: auto">
                <VerticalBarChart
                  :data="
                    $store.getters['reporte/results'].ejecucion.filter(
                      (obj) => obj.ano_eje === '2023'
                    )[0]
                  "
                  :legendClass="trimestre"
                  :legendColor="trimestre"
                />
              </div>
            </div>
            <div
              style="
                width: 100%;
                height: 48%;
                background-color: #ebf3ff;
                border-radius: 0px 5px 5px 0px;
              "
            >
              <div style="width: 100%; height: 10%; text-align: left">
                <label
                  v-if="
                    $store.getters[
                      'reporte/results'
                    ].ejecutora[0].ubigeo.substring(4, 6) === '01' &&
                    $store.getters['reporte/tipo'] !== 'dpto'
                  "
                  style="font-size: 20px; margin-left: 2px"
                >
                  Distritales de la provincia de
                  <span
                    v-text="
                      $store.getters['reporte/results'].ejecutora[0].nom_prov +
                      ', 2021-2023 (S/)'
                    "
                  ></span>
                </label>
                <label
                  v-if="
                    $store.getters[
                      'reporte/results'
                    ].ejecutora[0].ubigeo.substring(4, 6) !== '01' &&
                    $store.getters['reporte/tipo'] !== 'dpto'
                  "
                  style="font-size: 20px; margin-left: 2px"
                >
                  Distrital de
                  <span
                    v-text="
                      $store.getters['reporte/results'].ejecutora[0].nom_dist +
                      ', 2021-2023 (S/)'
                    "
                  ></span>
                </label>
                <label
                  v-if="
                    $store.getters['reporte/isMancomunidad'] === false &&
                    $store.getters['reporte/tipo'] === 'dpto' &&
                    $store.getters['reporte/results'].ejecutora[0].ubigeo !==
                      '26'
                  "
                  style="font-size: 20px; margin-left: 2px"
                >
                  del departamento de
                  <!--span
                    v-text="$store.getters['reporte/results'].ejecutora[0].nombre + ', 2018-2020 (S/)'"
                  ></span-->
                  <span
                    v-text="
                      $store.getters['reporte/results'].ejecutora[0].nom_dpto +
                      ', 2021-2023 (S/)'
                    "
                  ></span>
                </label>
                <label
                  v-if="
                    $store.getters['reporte/isMancomunidad'] === false &&
                    $store.getters['reporte/tipo'] === 'dpto' &&
                    $store.getters['reporte/results'].ejecutora[0].ubigeo ==
                      '26'
                  "
                  style="font-size: 20px; margin-left: 2px"
                >
                  de la MUNICIPALIDAD DE
                  <span v-text="'LIMA METROPOLITANA, 2021-2023 (S/)'"></span>
                </label>
                <label
                  v-else-if="$store.getters['reporte/isMancomunidad']"
                  style="font-size: 20px; margin-left: 2px"
                >
                  de la MANCOMUNIDAD
                  <span v-text="'REGIONAL DE LOS ANDES, 2021-2023 (S/)'"></span>
                </label>
              </div>
              <div style="width: 100%; height: 5%">
                <PresupuestoLegend :tipo="trimestre" />
              </div>
              <div style="width: 80%; height: 85%; margin: auto">
                <VerticalBarChart
                  :data="
                    $store.getters['reporte/results'].ejecuciontotal.filter(
                      (obj) => obj.ano_eje === '2023'
                    )[0]
                  "
                  :legendClass="trimestre"
                  :legendColor="trimestre"
                />
              </div>
            </div>
            <Fuente
              style="height: 4%"
              :label="`<strong>Presupuesto:</strong> Presupuesto Institucional Modificado (PIM) <strong style='margin-left:40px;'>Ejecutado:</strong> Devengado`"
            />
          </section-h>
          <section-h style="height: 47%; width: 100%; padding: 6px 6px 6px 2px">
            <EjecucionPresupuestal />
          </section-h>
          <section-h style="height: 5%; width: 100%; padding: 12px 6px 6px 2px">
            <Adscrita />
            <br />
            <Enlace color="red" class="pull-right" />
          </section-h>
        </section-v>
        <!-- #end Section 3 -->

        <div v-if="showPdfOptions" class="modal-mask" data-html2canvas-ignore>
          <div class="modal-wrapper">
            <div class="modal-container">
              <button
                @click="hidePdfOptions"
                class="modal-close"
                aria-label="Cerrar opciones PDF"
              >
                X
              </button>
              <div style="width: 100%; text-align: center">
                <h3>Opciones de PDF</h3>
              </div>
              <div
                style="width: 100%; text-align: center"
                class="container-fluid"
              >
                <div class="form-group">
                  <label>Seleccione tamaño de hoja</label>
                  <div class="form-group">
                    <label class="radio-inline">
                      <input
                        type="radio"
                        value="a4"
                        v-model="pdfOptions.page"
                        style="right: auto"
                      />
                      A4
                    </label>
                    <label class="radio-inline">
                      <input
                        type="radio"
                        value="a3"
                        v-model="pdfOptions.page"
                        style="right: auto"
                      />
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
                  style="background-color: #337ab7; border-color: #337ab7"
                  @click="generatePdf"
                >
                  Generar
                </button>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useHead, useRoute, definePageMeta, useNuxtApp } from "#imports";

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
import AguaSaneamiento from "~/components/reportea3/AguaSaneamiento";
import Salud from "~/components/reportea3/Salud";
import BrechaDigital from "~/components/reportea3/BrechaDigital";

import VerticalBarChart from "~/components/reportea3/VerticalBarChart";
import Adscrita from "~/components/reportea3/Adscrita";
import Enlace from "~/components/Enlace";
import Fuente from "~/components/reportea3/Fuente";
import LoadingGif from "~/components/reportea3/LoadingGif";

import Ubigeo from "~/static/ubigeo.js";
import UbigeoAlt from "~/static/ubigeoa.js";

import { STATIC_URL } from "~/const.js";
import { useGaEvent } from "~/composables/useGaEvent";
import { useScreenshot } from "~/composables/useScreenshot";
import { usePdf } from "~/composables/usePdf";

const route = useRoute();
const { $store } = useNuxtApp();

const staticUrl = STATIC_URL;
const showReport = ref(false);
const showShare = ref(false);
const showPdfOptions = ref(false);
const codigo = ref<string>("");
const url = ref<string>("");
const pdfOptions = reactive({
  page: "a3",
  margin: "0.5",
});

const { gaEvent } = useGaEvent();
const { formatSvgThenScreenShot } = useScreenshot();
const { imageToPdf } = usePdf();

const trimestre = computed(() => {
  const d = new Date();
  const q = [1, 2, 3, 4];
  return q[Math.floor(d.getMonth() / 3)] - 1;
});

const validateRoute = ({ params }: { params: any }) => {
  const id = String(params.id || "").trim();
  if (!id) return false;

  const ubigeos = [...(Ubigeo?.Ubigeo || []), ...(UbigeoAlt?.Ubigeo || [])];

  if (
    ubigeos.some(
      (obj) =>
        id.indexOf(obj.cod_dist) !== -1 ||
        id.indexOf(obj.cod_prov) !== -1 ||
        id.indexOf(obj.cod_dpto) !== -1
    )
  ) {
    return true;
  }

  return /^[0-9a-zA-Z_-]{2,}$/.test(id);
};

definePageMeta({
  layout: "reporte",
  validate: validateRoute,
});

useHead({
  title: "Reporte",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Reporte | Brechas | Geo Perú",
    },
  ],
});

const toggleShare = () => {
  showShare.value = !showShare.value;
};

const openPdfOptions = () => {
  showPdfOptions.value = true;
};

const hidePdfOptions = () => {
  showPdfOptions.value = false;
};

const printReport = () => {
  gaEvent("send", "event", "Reporte", "imprimir", route.params.id);
  if (process.client) {
    window.print();
  }
};

const setSocials = () => {
  if (!process.client) return;

  const shareNode = document.getElementById("share");
  const anyWindow = window as any;
  const jsSocials = anyWindow.jsSocials;
  const jq = anyWindow.$ || anyWindow.jQuery;

  if (!shareNode || !jsSocials || !jq) return;

  const isMobile =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-|)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    );

  jsSocials.shares.whatsapp = {
    label: "WhatsApp",
    logo: "fab fa-whatsapp",
    shareUrl: isMobile
      ? "whatsapp://send?text={url} {text}"
      : "https://web.whatsapp.com/send?text={url} {text}",
    countUrl: "",
  };

  jq(shareNode).jsSocials({
    url: route.query.page || url.value,
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
    text: $store?.getters?.["reporte/description"],
  });
};

const generatePdf = async () => {
  hidePdfOptions();
  $store?.dispatch?.("Loading/START", {
    tipo: "Overlay",
    text: `Generando Reporte: ${$store?.getters?.["reporte/description"]}`,
  });
  gaEvent("send", "event", "Reporte", "pdf", route.params.id);

  if (!process.client) return;

  const anyWindow = window as any;
  const jq = anyWindow.$ || anyWindow.jQuery;
  const svgElements = jq
    ? jq("#page-a3").find(".svg-icon")
    : document.querySelectorAll("#page-a3 .svg-icon");
  const mainElement = document.querySelector("#page-a3");

  const screenshot = await formatSvgThenScreenShot(
    svgElements,
    mainElement as HTMLElement,
    pdfOptions.margin
  );
  if (!screenshot) {
    $store?.dispatch?.("Loading/STOP");
    return;
  }

  const pdfDocument = await imageToPdf(
    screenshot,
    pdfOptions.page,
    pdfOptions.margin
  );
  pdfDocument?.save?.(
    `Reporte ${$store?.getters?.["reporte/description"] || route.params.id}.pdf`
  );
  $store?.dispatch?.("Loading/STOP");
};

const getResults = () => {
  if (!$store?.dispatch) {
    showReport.value = true;
    return Promise.resolve();
  }

  return $store
    .dispatch("reporte/fetchApi", codigo.value)
    .then(() => {
      if (codigo.value === "151") {
        $store.dispatch("reporte/isRegion", true);
      } else if (codigo.value === "M1") {
        $store.dispatch("reporte/isMancomunidad", true);
      }
      showReport.value = true;
    })
    .then(() => {
      setSocials();
    })
    .catch((error) => {
      console.log(error);
      showReport.value = true;
    });
};

onMounted(() => {
  codigo.value = String(route.params.id || "");
  if (process.client) {
    url.value = window.location.href;
  }
  getResults();
});
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

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-wrapper {
  width: 100%;
  max-width: 320px;
  padding: 10px;
}

.modal-container {
  background: white;
  border-radius: 6px;
  padding: 20px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
}
</style>
