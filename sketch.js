let blobs = [];
const NUM_BLOBS = 3;

// Define each column as a separate group with header and projects
const groups = [
  {
    header: 'WA.S12.CD02',
    projects: [
      {
        title: 'Group 1\nMaryia Karunnaya\nAnastasiya Kulikouskaya\nReem Fathma',
        url: 'https://nnstna.github.io/interface1/'
      },
      {
        title: 'Group 2\nKlara Petrusewicz\nSára Kramárová\nEkaterina Kozlovskaya',
        url: 'https://sarikez.github.io/GSWM1/'
      },
      {
        title: 'Group 3\nMilana Hiekkanena',
        url: 'https://kassio-space.github.io/Final_Assignment_Project_WA.S12.CD02/'
      }
    ]
  },
  {
    header: 'WZ.S12.CD33 grupa 1',
    projects: [
      {
        title: 'Grupa 1\nAgata Łukasik\nAlicja Dobosz\nMika Nechyporenko\nAlina Plisiecka',
        url: 'https://mikanechyporenko.github.io/gryczana_1'
      },
      {
        title: 'Grupa 2\nMaciej Piłaciński\nMikołaj Zwoliński\nMaria Stroińska',
        url: 'https://pwp131313.github.io/SUPERGRUPA/'
      },
      {
        title: 'Grupa 3\nKalina Rybacka\nPersie Dołębska\nNatalia Grzelak',
        url: 'https://natcat01.github.io/logowanie-du-e-'
      },
      {
        title: 'Grupa 4\nMartyna Stachera\nMartyna Borowska\nJagna Tokarzewska\nWiktoria Piekutowska\nMateusz Spinek',
        url: 'https://martynabella.github.io/magic_shop'
      }
    ]
  },
  {
    header: 'WZ.S12.CD33 grupa 2',
    projects: [
      {
        title: 'Grupa 1\nEmilia Polaczek\nNela Hryniak\nHelena Jacoń\nKornelia Roszkowska',
        url: 'https://nelahryniak.github.io/Scam_7/'
      },
      {
        title: 'Grupa 2 - brak linku\nAmelia Konieczna\nIga Pietrzykowska\nDarya Vasilevich\nKateryna Yerhiieva\nGabriela Teodorczyk',
        url: ''
      },
      {
        title: 'Grupa 3\nPaulina Smoczyńska\nAleksandra Wróbel\nMarta Oszczak\nKuba Żukowski',
        url: 'https://smokp.github.io/404-page'
      }
    ]
  },
  {
    header: 'WZ.N12.CD28',
    projects: [
      {
        title: 'Grupa 1: Działa!\nKuba Jaje\nSamira Salameh\nKamil Sałański\nMateusz Rybak',
        url: 'https://kubibubitheprogramista.github.io/Ryan1'
      },
      {
        title: 'Grupa 2: Dziewczyny - brak linku\nMalina Kuranowska\nJulia Banaś\nKinga Roksisz',
        url: ''
      },
      {
        title: 'Grupa 3: Temu\nMichał Składanek\nAmelia Eksner\nNatalia Dokla\nJacek W-Donhefner',
        url: 'https://ameliaeksner.github.io/Temu'
      }
    ]
  }
];

let clickableAreas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Roboto, sans-serif');
  textAlign(LEFT, TOP);
  initBlobs();
}

function draw() {
  drawGradient();
  drawBlobs();
  drawEntries();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function initBlobs() {
 // blobs = [];
  for (let i = 0; i < NUM_BLOBS; i++) {
    blobs.push({
      x: random(width),
      y: random(height),
      baseR: random(200, 350),
      noiseOffset: random(1000)
    });
  }
}

function drawGradient() {
  const c1 = color('#ff9a9e');
  const c2 = color('#fad0c4');
  noFill();
  for (let y = 0; y <= height; y++) {
    stroke(lerpColor(c1, c2, y / height));
    line(0, y, width, y);
  }
}

function drawBlobs() {
  noStroke();
  blobs.forEach(b => {
    push();
    translate(b.x, b.y);
    fill(255, 255, 255, 50);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      const xoff = cos(a) + b.noiseOffset;
      const yoff = sin(a) + b.noiseOffset;
      const r = b.baseR + map(noise(xoff, yoff, frameCount * 0.002), 0, 1, -80, 80);
      vertex(r * cos(a), r * sin(a));
    }
    endShape(CLOSE);
    
    pop();
    b.noiseOffset += 0.004;
  });
}

function drawEntries() {
  const marginX = 40;
  const marginY = 60;
  const cols = groups.length;
  const innerW = width - marginX * 2;
  const colW = innerW / cols;
  clickableAreas = [];

  groups.forEach((g, i) => {
    const x = marginX + i * colW;
    let y = marginY;

    // Header (bold)
    fill(0);
    textSize(18);
    textStyle(BOLD);
    text(g.header, x, y);
    y += textAscent() + textDescent() + 16;

    // Projects
    g.projects.forEach(p => {
      // Project title bold
      fill(0);
      textSize(14);
      textStyle(BOLD);
      const firstLine = p.title.split('\n')[0];
      text(firstLine, x, y);
      y += textAscent() + textDescent() + 4;

      // Members regular
      textSize(12);
      textStyle(NORMAL);
      const members = p.title.split('\n').slice(1);
      members.forEach(line => {
        text(line, x, y);
        y += 14;
      });

      // Link bold and colored
      if (p.url) {
        fill('#ffdd57');
        textSize(12);
        textStyle(BOLD);
        const label = '→ Link';
        text(label, x, y);
        clickableAreas.push({ x, y, w: textWidth(label), h: 12, url: p.url });
        y += 20;
      } else {
        y += 12;
      }

      // Spacer between projects
      y += 12;
    });
  });
}

function mouseMoved() {
  let hovering = false;
  clickableAreas.forEach(area => {
    if (mouseX >= area.x && mouseX <= area.x + area.w && mouseY >= area.y && mouseY <= area.y + area.h) {
      hovering = true;
    }
  });
  cursor(hovering ? HAND : ARROW);
}

function mousePressed() {
  clickableAreas.forEach(area => {
    if (mouseX >= area.x && mouseX <= area.x + area.w && mouseY >= area.y && mouseY <= area.y + area.h) {
      window.open(area.url, '_blank');
    }
  });
}
